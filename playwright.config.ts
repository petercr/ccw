import './e2e/env-setup';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // In CI use the pre-built production server (avoids Vite cold-compilation
    // on first visit to each route, which can exceed the URL assertion timeout).
    // Locally, reuse whatever dev server is already running.
    command: process.env.CI
      ? 'npm start --workspace=@santan/frontend'
      : 'npm run dev --workspace=@santan/frontend',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
