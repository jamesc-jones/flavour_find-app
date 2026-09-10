import { test, expect, type APIRequestContext } from '@playwright/test';
import { clerk, setupClerkTestingToken } from '@clerk/testing/playwright';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Client } = require('pg');

const API_BASE = 'http://localhost:3000';

async function withDbClient<T>(fn: (client: InstanceType<typeof Client>) => Promise<T>): Promise<T> {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });
    await client.connect();
    try {
        return await fn(client);
    } finally {
        await client.end();
    }
}

async function getUserRow(userId: string) {
    return withDbClient(async (client) => {
        const { rows } = await client.query(
            'SELECT tier, stripe_customer_id FROM users WHERE id = $1',
            [userId]
        );
        return rows[0] as { tier: string; stripe_customer_id: string | null } | undefined;
    });
}

async function setUserFields(
    userId: string,
    fields: { tier?: string; stripe_customer_id?: string | null }
) {
    await withDbClient(async (client) => {
        if ('tier' in fields) {
            await client.query('UPDATE users SET tier = $1 WHERE id = $2', [fields.tier, userId]);
        }
        if ('stripe_customer_id' in fields) {
            await client.query('UPDATE users SET stripe_customer_id = $1 WHERE id = $2', [
                fields.stripe_customer_id,
                userId,
            ]);
        }
    });
}

async function signInAndGetToken(page: import('@playwright/test').Page): Promise<string> {
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
    const token = await page.evaluate(async () => {
        const win = window as unknown as { Clerk?: { session?: { getToken: () => Promise<string | null> } } };
        return win.Clerk?.session?.getToken();
    });
    expect(typeof token).toBe('string');
    return token as string;
}

async function getUserId(page: import('@playwright/test').Page): Promise<string> {
    const userId = await page.evaluate(() => {
        const win = window as unknown as { Clerk?: { user?: { id?: string } } };
        return win.Clerk?.user?.id;
    });
    expect(typeof userId).toBe('string');
    return userId as string;
}

test.describe('Billing — unauthenticated', () => {
    test('POST /api/billing/checkout without auth returns 401', async ({ request }: { request: APIRequestContext }) => {
        const res = await request.post(`${API_BASE}/api/billing/checkout`);
        expect(res.status()).toBe(401);
    });

    test('POST /api/billing/portal without auth returns 401', async ({ request }: { request: APIRequestContext }) => {
        const res = await request.post(`${API_BASE}/api/billing/portal`);
        expect(res.status()).toBe(401);
    });
});

test.describe('Billing — webhook signature verification', () => {
    test('POST /api/billing/webhook with no stripe-signature header returns 400', async ({ request }: { request: APIRequestContext }) => {
        const res = await request.post(`${API_BASE}/api/billing/webhook`, {
            data: { type: 'customer.subscription.created' },
        });
        expect(res.status()).toBe(400);
    });

    test('POST /api/billing/webhook with an invalid/tampered signature returns 400', async ({ request }: { request: APIRequestContext }) => {
        const res = await request.post(`${API_BASE}/api/billing/webhook`, {
            headers: { 'stripe-signature': 't=1,v1=tampered' },
            data: { type: 'customer.subscription.created' },
        });
        expect(res.status()).toBe(400);
    });
});

test.describe('Billing — authenticated UI and API (free-tier baseline)', () => {
    // The dedicated E2E Clerk test user already carries a real Stripe test-mode
    // stripe_customer_id from prior legitimate checkout-flow exercise; its natural
    // baseline state is tier='free' with that customer_id set. Tests in this block
    // rely on that baseline and restore it after any test that must temporarily
    // change it, so tests remain independent under Playwright's sequential
    // (workers: 1, fullyParallel: false) execution.

    test('authenticated free-tier user sees "Upgrade to Premium" on the billing page', async ({ page }) => {
        const userId = await signInAndGetToken(page).then(async () => getUserId(page));
        const before = await getUserRow(userId);
        expect(before?.tier).toBe('free');

        await page.goto('/billing/');
        await expect(page.getByRole('button', { name: 'Upgrade to Premium' })).toBeVisible();
        // Scoped to <main>: the global layout also renders its own TierBadge
        // (fixed top-left, outside <main>), so an unscoped locator matches both.
        await expect(page.getByRole('main').getByText('Free', { exact: true })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Manage Subscription' })).toHaveCount(0);
    });

    test('POST /api/billing/checkout with valid Clerk auth', async ({ page }) => {
        const token = await signInAndGetToken(page);
        const res = await page.request.post(`${API_BASE}/api/billing/checkout`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const body = await res.json().catch(() => ({}));

        if (res.status() === 200 && typeof body.url === 'string' && body.url.startsWith('https://checkout.stripe.com/')) {
            expect(body.url).toMatch(/^https:\/\/checkout\.stripe\.com\//);
        } else {
            // KNOWN EXTERNAL BLOCKER (documented in phase8_plan_1_4.md Task 8-B
            // verification): the Stripe test account's Premium product lacks the
            // product tax code Managed Payments requires, so real Checkout Session
            // creation currently fails server-side (500). This is an external
            // Stripe test-account configuration prerequisite, not an application
            // defect — see server.js /api/billing/checkout and Task 8-B/8-C
            // verification history. Do not "fix" this by weakening the assertion
            // below; it intentionally fails until the Stripe account is configured.
            expect(
                res.status(),
                `Expected 200 with a checkout.stripe.com URL, got ${res.status()} ${JSON.stringify(body)}. ` +
                    'This is the known external Stripe Managed Payments/product-tax-code prerequisite, not an application defect.'
            ).toBe(200);
        }
    });

    test('POST /api/billing/portal — State A (no Stripe Customer) returns 400', async ({ page }) => {
        const token = await signInAndGetToken(page);
        const userId = await getUserId(page);
        const original = await getUserRow(userId);
        expect(original?.stripe_customer_id).toBeTruthy();

        await setUserFields(userId, { stripe_customer_id: null });
        try {
            const res = await page.request.post(`${API_BASE}/api/billing/portal`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            expect(res.status()).toBe(400);
            const body = await res.json();
            expect(body.error).toBe('No billing account found');
        } finally {
            await setUserFields(userId, { stripe_customer_id: original!.stripe_customer_id });
        }
    });

    test('POST /api/billing/portal — State B (Stripe Customer exists, not premium) returns 400', async ({ page }) => {
        const token = await signInAndGetToken(page);
        const userId = await getUserId(page);
        const row = await getUserRow(userId);
        expect(row?.stripe_customer_id).toBeTruthy();
        expect(row?.tier).toBe('free');

        const res = await page.request.post(`${API_BASE}/api/billing/portal`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        expect(res.status()).toBe(400);
        const body = await res.json();
        expect(body.error).toBe('No active subscription');
    });

    test('POST /api/billing/portal — State C (active Premium entitlement) returns 200 with a billing.stripe.com URL', async ({ page }) => {
        const token = await signInAndGetToken(page);
        const userId = await getUserId(page);
        const original = await getUserRow(userId);
        expect(original?.stripe_customer_id).toBeTruthy();

        await setUserFields(userId, { tier: 'premium' });
        try {
            const res = await page.request.post(`${API_BASE}/api/billing/portal`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            expect(res.status()).toBe(200);
            const body = await res.json();
            expect(body.url).toMatch(/^https:\/\/billing\.stripe\.com\//);
        } finally {
            await setUserFields(userId, { tier: original!.tier });
        }
    });

    test('authenticated premium-tier user sees "Manage Subscription" on the billing page (pre-seeded DB fixture)', async ({ page }) => {
        const userId = await signInAndGetToken(page).then(async () => getUserId(page));
        const original = await getUserRow(userId);

        await setUserFields(userId, { tier: 'premium' });
        try {
            await page.goto('/billing/');
            await expect(page.getByRole('button', { name: 'Manage Subscription' })).toBeVisible();
            // Scoped to <main> — see the free-tier test above for why.
            await expect(page.getByRole('main').getByText('Premium', { exact: true })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Upgrade to Premium' })).toHaveCount(0);
        } finally {
            await setUserFields(userId, { tier: original!.tier });
        }
    });
});
