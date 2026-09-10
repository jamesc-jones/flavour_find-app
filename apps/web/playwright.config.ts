import path from 'path';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  globalSetup: './global-setup.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'node server.js',
      url: 'http://localhost:3000/api/moods',
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
      stderr: 'pipe',
      stdout: 'pipe',
      cwd: path.resolve(__dirname, '../..'),
      // These three redirect URLs are not in .env (see phase8_plan_1_4.md Task 8-B
      // verification notes); supplied here only for this test-server invocation,
      // matching the values .env.example documents as intended, so
      // POST /api/billing/portal's real Stripe API call has a valid return_url.
      // STRIPE_WEBHOOK_SECRET is intentionally NOT set here — the webhook
      // signature-failure tests (400) hold regardless of whether it's configured.
      env: {
        STRIPE_SUCCESS_URL: 'http://localhost:3001/billing?result=success',
        STRIPE_CANCEL_URL: 'http://localhost:3001/billing?result=cancel',
        STRIPE_PORTAL_RETURN_URL: 'http://localhost:3001/billing',
      },
    },
    {
      command: 'npm --workspace=apps/web run dev',
      url: 'http://localhost:3001',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      stderr: 'pipe',
      stdout: 'pipe',
      cwd: path.resolve(__dirname, '../..'),
      env: {
        NEXT_PUBLIC_API_URL: 'http://localhost:3000',
      },
    },
  ],
});
