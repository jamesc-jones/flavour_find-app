import path from 'path';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
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
      command: 'node ../../server.js',
      url: 'http://localhost:3000/api/moods',
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
      stderr: 'pipe',
      stdout: 'pipe',
    },
    {
      command: 'npm --workspace=apps/web run dev',
      url: 'http://localhost:3001',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      stderr: 'pipe',
      stdout: 'pipe',
      cwd: path.resolve(__dirname, '../..'),
    },
  ],
});
