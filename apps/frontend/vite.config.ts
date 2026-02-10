import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import viteReact from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default ({ mode }: ConfigEnv) => {
	// Workaround to load secrets since it's broken in Tanstack RC0 (or similar versions)
	Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
	return defineConfig({
		plugins: [
			devtools(),
			nitroV2Plugin({ preset: 'vercel' }),
			// this is the plugin that enables path aliases
			viteTsConfigPaths({
				projects: ['./tsconfig.json'],
			}),
			tailwindcss(),
			tanstackStart(),
			viteReact(),
			vanillaExtractPlugin(),
		],
	});
};
