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
		// Production Nitro server (avoids Vite cold-compilation on first visit).
		// vp build with the node-server preset, then serve the output.
		command: 'NITRO_PRESET=node-server npx vp build && node .output/server/index.mjs',
		cwd: 'apps/frontend',
		port: 3000,
		env: {
			...process.env,
			HOST: '0.0.0.0',
		},
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
