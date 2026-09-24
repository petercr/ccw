import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import viteReact from '@vitejs/plugin-react';
import { NodeRequest, sendNodeResponse } from 'srvx/node';
import { defineConfig, lazyPlugins, loadEnv } from 'vite-plus';
import type { ConfigEnv, Plugin } from 'vite-plus';
import viteTsConfigPaths from 'vite-tsconfig-paths';

type SsrRunner = {
	import: (id: string) => Promise<{ default: { fetch: (request: Request) => Promise<Response> } }>;
};

/**
 * `vp dev` loads Vite from the global CLI while TanStack Start imports `vite`
 * from the workspace. `isRunnableDevEnvironment` is an `instanceof` check, so
 * it fails (dual-package) and Start silently skips its SSR middleware — every
 * page then returns Connect's "Cannot GET /". Install the same handler using
 * a duck-typed runner when that check fails.
 *
 * @see https://github.com/TanStack/router/issues/6982
 */
function tanstackStartVitePlusDevMiddleware(): Plugin {
	return {
		name: 'tanstack-start-vite-plus-dev-middleware',
		configureServer(viteDevServer) {
			return () => {
				const serverEnv = viteDevServer.environments.ssr;
				const runner = (serverEnv as { runner?: SsrRunner } | undefined)?.runner;
				if (typeof runner?.import !== 'function') {
					viteDevServer.config.logger.error(
						'[tanstack-start] SSR environment has no module runner; page routes will 404',
					);
					return;
				}

				viteDevServer.config.logger.info('vite+ dual-package workaround: installing TanStack Start SSR middleware');

				viteDevServer.middlewares.use(async (req, res) => {
					if (req.originalUrl) {
						req.url = req.originalUrl;
					}
					const webReq = new NodeRequest({ req, res });
					try {
						const serverEntry = await runner.import('virtual:tanstack-start-server-entry');
						const webRes = await serverEntry.default.fetch(webReq);
						return sendNodeResponse(res, webRes);
					} catch (error) {
						console.error(error);
						try {
							viteDevServer.ssrFixStacktrace(error as Error);
						} catch {
							// ignore
						}
						res.statusCode = 500;
						res.end(error instanceof Error ? error.stack : String(error));
					}
				});
			};
		},
	};
}

export default ({ mode }: ConfigEnv) => {
	// Workaround to load secrets since it's broken in Tanstack RC0 (or similar versions)
	Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
	return defineConfig({
		plugins: lazyPlugins(() => [
			devtools(),
			nitroV2Plugin({
				// Use 'node-server' for local/CI e2e tests; Vercel builds with its preset.
				preset: (process.env.NITRO_PRESET as 'vercel' | 'node-server') ?? 'vercel',
				compatibilityDate: '2026-02-21',
				vercel: { functions: { runtime: 'nodejs26.x' } },
			}),
			// Required for vanilla-extract's internal vite-node to resolve @/ path aliases
			viteTsConfigPaths({
				projects: ['./tsconfig.json'],
			}),
			tailwindcss(),
			tanstackStart(),
			tanstackStartVitePlusDevMiddleware(),
			viteReact(),
			vanillaExtractPlugin(),
		]),
		test: {
			environment: 'jsdom',
			include: ['src/**/*.test.{ts,tsx}'],
		},
	});
};
