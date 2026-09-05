import { test, expect } from '@playwright/test';
import { clerk, setupClerkTestingToken } from '@clerk/testing/playwright';
import path from 'node:path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '..', '..', '..', 'recipes.db');

function deleteUsageCreatedAfter(userId: string, sinceIso: string) {
    const db = new Database(dbPath);
    const since = sinceIso.slice(0, 19).replace('T', ' '); // match SQLite's naive UTC format
    const result = db
        .prepare('DELETE FROM chat_usage WHERE user_id = ? AND created_at >= ?')
        .run(userId, since);
    db.close();
    return result.changes;
}

test.describe('Phase 5 chat — signed out', () => {
    test('unauthenticated /chat shows the sign-in gate, not the chat interface', async ({ page }) => {
        await page.goto('/chat');
        await expect(
            page.getByText('Sign in to chat with the Flavour Find assistant.')
        ).toBeVisible();
        await expect(page.getByPlaceholder('Ask about a recipe...')).toHaveCount(0);
    });
});

test.describe('Phase 5 chat — authenticated', () => {
    test('authenticated user can send a message and receive a real streamed AI response', async ({ page }) => {
        test.setTimeout(60_000);

        const testStart = new Date().toISOString();

        await setupClerkTestingToken({ page });
        await page.goto('/');
        await clerk.signIn({
            page,
            signInParams: {
                strategy: 'password',
                identifier: process.env.E2E_CLERK_USER_USERNAME!,
                password: process.env.E2E_CLERK_USER_PASSWORD!,
            },
        });

        const userId = await page.evaluate(() => {
            const win = window as unknown as { Clerk?: { user?: { id?: string } } };
            return win.Clerk?.user?.id;
        });
        expect(typeof userId).toBe('string');

        await page.goto('/chat');

        const input = page.getByPlaceholder('Ask about a recipe...');
        await expect(input).toBeVisible();

        await input.fill('Reply with just the word hi.');

        const [response] = await Promise.all([
            page.waitForResponse(
                (res) => res.url().includes('/api/v1/chat') && res.request().method() === 'POST'
            ),
            page.getByRole('button', { name: 'Send' }).click(),
        ]);

        // Proves a genuine SSE stream was returned (not a synchronous JSON response) —
        // the response resolves on header receipt, before the body finishes streaming.
        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('text/event-stream');

        const lastBubble = page.locator('.overflow-y-auto > div').last();
        await expect(lastBubble).not.toHaveText('', { timeout: 30_000 });

        await expect(page.getByText(/messages remaining today\./)).toBeVisible({ timeout: 30_000 });
        await expect(input).toBeEnabled();

        if (typeof userId === 'string') {
            const deleted = deleteUsageCreatedAfter(userId, testStart);
            expect(deleted).toBe(1);
        }
    });
});

test.describe('Phase 5 chat — rate limit (test-process-scoped limit only)', () => {
    test('rejects the third message with a real 429 once the test-scoped limit is reached', async ({ page }) => {
        // Requires AI_CHAT_LIMIT_FREE=3 in the environment invoking this test run only
        // (e.g. `AI_CHAT_LIMIT_FREE=3 npx playwright test ...`). Never set in .env or
        // production config — this only affects the ephemeral webServer process
        // Playwright launches for this invocation.
        //
        // The dedicated E2E Clerk user has exactly one pre-existing chat_usage row
        // already inside the rolling 24h window (unrelated Phase 4-era data, preserved
        // as-is). With limit=3: pre-existing usage=1, so request #1 -> used=2 (200),
        // request #2 -> used=3 (200), request #3 -> used=3 already at limit (429).
        test.skip(
            process.env.AI_CHAT_LIMIT_FREE !== '3',
            'Requires AI_CHAT_LIMIT_FREE=3 set only in the invoking environment for this isolated run.'
        );
        test.setTimeout(90_000);

        const testStart = new Date().toISOString();

        await setupClerkTestingToken({ page });
        await page.goto('/');
        await clerk.signIn({
            page,
            signInParams: {
                strategy: 'password',
                identifier: process.env.E2E_CLERK_USER_USERNAME!,
                password: process.env.E2E_CLERK_USER_PASSWORD!,
            },
        });

        const userId = await page.evaluate(() => {
            const win = window as unknown as { Clerk?: { user?: { id?: string } } };
            return win.Clerk?.user?.id;
        });
        expect(typeof userId).toBe('string');

        await page.goto('/chat');

        const input = page.getByPlaceholder('Ask about a recipe...');
        const sendButton = page.getByRole('button', { name: 'Send' });

        // Requests 1 and 2: must succeed against the real, unmocked backend (test-scoped limit = 3,
        // with 1 pre-existing usage row already counted for this user).
        for (let i = 1; i <= 2; i++) {
            await expect(input).toBeVisible();
            await input.fill(`Reply with just the word hi. (request ${i})`);
            const [response] = await Promise.all([
                page.waitForResponse(
                    (res) => res.url().includes('/api/v1/chat') && res.request().method() === 'POST'
                ),
                sendButton.click(),
            ]);
            expect(response.status()).toBe(200);
            await expect(input).toBeEnabled({ timeout: 30_000 });
        }

        // Request 3: must be rejected with a real 429 from the real, unmocked backend.
        await input.fill('Reply with just the word hi. (request 3)');
        const [thirdResponse] = await Promise.all([
            page.waitForResponse(
                (res) => res.url().includes('/api/v1/chat') && res.request().method() === 'POST'
            ),
            sendButton.click(),
        ]);
        expect(thirdResponse.status()).toBe(429);

        const body = await thirdResponse.json();
        expect(body.error).toBe('Rate limit exceeded');
        expect(body.remaining).toBe(0);
        expect(typeof body.resetAt).toBe('string');

        await expect(page.getByText(/Rate limit exceeded\./)).toBeVisible({ timeout: 10_000 });
        await expect(page.getByText(/Try again after/)).toBeVisible();

        if (typeof userId === 'string') {
            // Exactly the 2 successful requests reach insertChatUsage; the 429 branch
            // returns before any usage row is written.
            const deleted = deleteUsageCreatedAfter(userId, testStart);
            expect(deleted).toBe(2);
        }
    });
});
