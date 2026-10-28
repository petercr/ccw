import { seo } from '@/lib/seo.ts';
import type { HomeDocument } from '@/types/home.ts';

/**
 * The hero title/subtitle in Sanity are brand copy ("Bringing Your Ideas To The World 💡🌎").
 * Search snippets need the service + location, so the meta title/description are set here
 * rather than reusing the hero text.
 */
export const homeMeta = (document?: HomeDocument, relativeUrl?: string) => {
	const brand = document?.title || 'Cape Cod World';
	return {
		meta: [
			...seo({
				title: `${brand} | Web Design & Development on Cape Cod, MA`,
				description:
					'Cape Cod World builds fast, modern websites for small businesses on Cape Cod, Massachusetts. Design, development, content and AI integration from a local, year-round partner. Free website review.',
				keywords: [
					'Cape Cod web design',
					'website design Cape Cod MA',
					'web developer Cape Cod',
					'small business website Cape Cod',
					'Hyannis web design',
					'Falmouth web design',
				],
				relativeUrl,
			}),
		],
	};
};
