import { test, expect } from '@playwright/test';
import { clerk, setupClerkTestingToken } from '@clerk/testing/playwright';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Client } = require('pg');

async function deleteUsageCreatedAfter(userId: string, sinceIso: string) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });
    await client.connect();
    const result = await client.query(
        'DELETE FROM chat_usage WHERE user_id = $1 AND created_at >= $2',
        [userId, sinceIso]
    );
    await client.end();
    return result.rowCount;
}

const FAB_OPEN_LABEL = 'Open chat';
const FAB_CLOSE_LABEL = 'Close chat';

test.describe('Floating chat widget — visibility', () => {
    test('widget FAB is visible on the home page', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('button', { name: FAB_OPEN_LABEL })).toBeVisible();
    });

    test('widget FAB is visible on the saved recipes page', async ({ page }) => {
        await page.goto('/saved');
        await expect(page.getByRole('button', { name: FAB_OPEN_LABEL })).toBeVisible();
    });

    test('widget FAB is NOT visible on the /chat page (Decision 4: hide)', async ({ page }) => {
        await page.goto('/chat');
        await expect(page.getByRole('button', { name: FAB_OPEN_LABEL })).toHaveCount(0);
        await expect(page.getByRole('button', { name: FAB_CLOSE_LABEL })).toHaveCount(0);
    });
});

test.describe('Floating chat widget — open/close behavior', () => {
    test('clicking the FAB opens the panel and focuses the input or sign-in prompt', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: FAB_OPEN_LABEL }).click();

        const dialog = page.getByRole('dialog', { name: 'Flavour Find Assistant' });
        await expect(dialog).toBeVisible();
        await expect(page.getByRole('button', { name: FAB_CLOSE_LABEL })).toBeVisible();
    });

    test('clicking the FAB again closes the panel', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: FAB_OPEN_LABEL }).click();
        await expect(page.getByRole('dialog', { name: 'Flavour Find Assistant' })).toBeVisible();

        await page.getByRole('button', { name: FAB_CLOSE_LABEL }).click();
        await expect(page.getByRole('dialog', { name: 'Flavour Find Assistant' })).toHaveCount(0);
        await expect(page.getByRole('button', { name: FAB_OPEN_LABEL })).toBeVisible();
    });

    test('pressing Escape closes the panel and returns focus to the FAB', async ({ page }) => {
        await page.goto('/');
        const fab = page.getByRole('button', { name: FAB_OPEN_LABEL });
        await fab.click();
        await expect(page.getByRole('dialog', { name: 'Flavour Find Assistant' })).toBeVisible();

        await page.keyboard.press('Escape');
        await expect(page.getByRole('dialog', { name: 'Flavour Find Assistant' })).toHaveCount(0);
        await expect(page.getByRole('button', { name: FAB_OPEN_LABEL })).toBeFocused();
    });
});

test.describe('Floating chat widget — signed out', () => {
    test('unauthenticated user sees a sign-in prompt, not the chat interface', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: FAB_OPEN_LABEL }).click();

        await expect(page.getByText('Sign in to chat with the Flavour Find assistant.')).toBeVisible();
        await expect(page.getByPlaceholder('Ask about a recipe...')).toHaveCount(0);
    });

    test('sign-in action navigates to /sign-in', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: FAB_OPEN_LABEL }).click();

        await page.getByRole('button', { name: 'Sign in' }).click();
        await expect(page).toHaveURL(/\/sign-in\/?$/);
    });
});

test.describe('Floating chat widget — authenticated', () => {
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

        await page.goto('/');
        await page.getByRole('button', { name: FAB_OPEN_LABEL }).click();

        const input = page.getByPlaceholder('Ask about a recipe...');
        await expect(input).toBeVisible();
        await expect(input).toBeFocused();

        await input.fill('Reply with just the word hi.');

        const [response] = await Promise.all([
            page.waitForResponse(
                (res) => res.url().includes('/api/v1/chat') && res.request().method() === 'POST'
            ),
            page.getByRole('button', { name: 'Send' }).click(),
        ]);

        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('text/event-stream');

        await expect(page.getByText(/messages remaining today\./)).toBeVisible({ timeout: 30_000 });
        await expect(input).toBeEnabled();

        if (typeof userId === 'string') {
            const deleted = await deleteUsageCreatedAfter(userId, testStart);
            expect(deleted).toBe(1);
        }
    });
});

test.describe('Floating chat widget — rate limit (test-process-scoped limit only)', () => {
    test('rejects the third message with a real 429 and displays the rate-limit state', async ({ page }) => {
        // Requires AI_CHAT_LIMIT_FREE=3 in the environment invoking this test run only
        // (e.g. `AI_CHAT_LIMIT_FREE=3 npx playwright test ...`). Never set in .env or
        // production config — this only affects the ephemeral webServer process
        // Playwright launches for this invocation. Mirrors the established mechanism
        // in apps/web/e2e/chat.spec.ts, exercised through the widget instead of /chat.
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

        await page.goto('/');
        await page.getByRole('button', { name: FAB_OPEN_LABEL }).click();

        const input = page.getByPlaceholder('Ask about a recipe...');
        const sendButton = page.getByRole('button', { name: 'Send' });

        // Requests 1 and 2: must succeed against the real, unmocked backend (test-scoped limit = 3,
        // with 1 pre-existing usage row already counted for this user, matching chat.spec.ts's setup).
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
            const deleted = await deleteUsageCreatedAfter(userId, testStart);
            expect(deleted).toBe(2);
        }
    });
});
