import '@/styles/globals.css.ts';

import { createRootRouteWithContext } from '@tanstack/react-router';
import appCss from '../styles.css?url';

import { GlobalLayout } from '@/components/GlobalLayout/GlobalLayout.tsx';
import { globalLayout as globalLayoutLoader } from '@/loaders/globalLayout.ts';
import type { QueryClient } from '@tanstack/react-query';

interface MyRouterContext {
	queryClient: QueryClient;
	request: Request | null;
	isPreview?: boolean; // Preview state from root loader
}

const SITE_URL = (import.meta.env.VITE_SITE_URL || process.env.VITE_SITE_URL || 'https://www.capecod.world/').replace(
	/\/$/,
	'',
);

// Local-business structured data so Google can tie the site to a place and service area.
// No street address is published; areaServed carries the geography instead.
const localBusinessJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'ProfessionalService',
	'@id': `${SITE_URL}/#business`,
	name: 'Cape Cod World',
	url: `${SITE_URL}/`,
	logo: `${SITE_URL}/web-app-manifest-512x512-v2.png`,
	image: `${SITE_URL}/og-image-v2.png`,
	description: 'Web design, development, content and AI integration for small businesses on Cape Cod, Massachusetts.',
	address: { '@type': 'PostalAddress', addressRegion: 'MA', addressCountry: 'US' },
	areaServed: [
		'Cape Cod',
		'Barnstable',
		'Hyannis',
		'Falmouth',
		'Bourne',
		'Sandwich',
		'Mashpee',
		'Yarmouth',
		'Dennis',
		'Harwich',
		'Brewster',
		'Chatham',
		'Orleans',
		'Eastham',
		'Wellfleet',
		'Truro',
		'Provincetown',
		"Martha's Vineyard",
		'Nantucket',
		'South Shore MA',
	].map((name) => ({ '@type': 'Place', name })),
	knowsAbout: ['Web design', 'Web development', 'Local SEO', 'Content strategy', 'AI integration', 'Web hosting'],
	sameAs: [
		'https://www.linkedin.com/in/peter-cruckshank-25022a141/',
		'https://github.com/petercr',
		'https://x.com/PeteCapeCod',
	],
};

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
