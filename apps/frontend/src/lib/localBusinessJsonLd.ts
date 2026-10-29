import { normalizeSiteUrl } from '@/lib/sitemap.ts';

/** Cape Cod towns plus the Islands and South Shore, used as the schema.org service area. */
export const SERVICE_AREA = [
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
] as const;

export const SOCIAL_PROFILES = [
	'https://www.linkedin.com/in/peter-cruckshank-25022a141/',
	'https://github.com/petercr',
	'https://x.com/PeteCapeCod',
] as const;

/**
 * schema.org ProfessionalService record for the root <head>, so search engines tie the
 * site to a place and service area. No street address is published; areaServed carries
 * the geography instead.
 */
export function buildLocalBusinessJsonLd(siteUrl: string | undefined) {
	const base = normalizeSiteUrl(siteUrl);
	return {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		'@id': `${base}/#business`,
		name: 'Cape Cod World',
		url: `${base}/`,
		logo: `${base}/web-app-manifest-512x512-v2.png`,
		image: `${base}/og-image-v2.png`,
		description: 'Web design, development, content and AI integration for small businesses on Cape Cod, Massachusetts.',
		address: { '@type': 'PostalAddress', addressRegion: 'MA', addressCountry: 'US' },
		areaServed: SERVICE_AREA.map((name) => ({ '@type': 'Place', name })),
		knowsAbout: ['Web design', 'Web development', 'Local SEO', 'Content strategy', 'AI integration', 'Web hosting'],
		sameAs: [...SOCIAL_PROFILES],
	};
}
