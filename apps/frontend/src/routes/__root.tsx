import '@/styles/globals.css.ts';

import { createRootRouteWithContext } from '@tanstack/react-router';
import appCss from '../styles.css?url';

import { GlobalLayout } from '@/components/GlobalLayout/GlobalLayout.tsx';
import { buildLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd.ts';
import { globalLayout as globalLayoutLoader } from '@/loaders/globalLayout.ts';
import type { QueryClient } from '@tanstack/react-query';

interface MyRouterContext {
	queryClient: QueryClient;
	request: Request | null;
	isPreview?: boolean; // Preview state from root loader
}

// Only import.meta.env here: this module is evaluated in the browser too, where process is undefined.
const localBusinessJsonLd = buildLocalBusinessJsonLd(import.meta.env.VITE_SITE_URL);

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => {
		return {
			meta: [
				{
					charSet: 'utf-8',
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					title: 'Cape Cod World | Web Design & Development on Cape Cod, MA',
				},
				{
					name: 'description',
					content:
						'Cape Cod World builds fast, modern websites for small businesses on Cape Cod, Massachusetts. Design, development, content and AI integration from a local, year-round partner.',
				},
			],
			links: [
				{
					rel: 'stylesheet',
					href: appCss,
				},
			],
			scripts: [
				{
					type: 'application/ld+json',
					children: JSON.stringify(localBusinessJsonLd),
				},
			],
		};
	},
	loader: globalLayoutLoader,
	shellComponent: GlobalLayout,
});
