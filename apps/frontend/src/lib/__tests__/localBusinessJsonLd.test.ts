import { describe, expect, it } from 'vite-plus/test';
import { buildLocalBusinessJsonLd, SERVICE_AREA, SOCIAL_PROFILES } from '../localBusinessJsonLd';

describe('buildLocalBusinessJsonLd', () => {
	const jsonLd = buildLocalBusinessJsonLd('https://www.capecod.world/');

	it('is a schema.org ProfessionalService with absolute URLs derived from the site URL', () => {
		expect(jsonLd['@context']).toBe('https://schema.org');
		expect(jsonLd['@type']).toBe('ProfessionalService');
		expect(jsonLd['@id']).toBe('https://www.capecod.world/#business');
		expect(jsonLd.url).toBe('https://www.capecod.world/');
		expect(jsonLd.logo).toBe('https://www.capecod.world/web-app-manifest-512x512-v2.png');
		expect(jsonLd.image).toBe('https://www.capecod.world/og-image-v2.png');
	});

	it('names Cape Cod and Massachusetts as the location without a street address', () => {
		expect(jsonLd.address).toEqual({ '@type': 'PostalAddress', addressRegion: 'MA', addressCountry: 'US' });
		expect(jsonLd.areaServed).toHaveLength(SERVICE_AREA.length);
		expect(jsonLd.areaServed[0]).toEqual({ '@type': 'Place', name: 'Cape Cod' });
		expect(jsonLd.areaServed.map((p) => p.name)).toEqual(
			expect.arrayContaining(['Hyannis', 'Falmouth', 'Provincetown']),
		);
	});

	it('links the social profiles and survives JSON serialization', () => {
		expect(jsonLd.sameAs).toEqual([...SOCIAL_PROFILES]);
		expect(JSON.parse(JSON.stringify(jsonLd))).toEqual(jsonLd);
	});

	it('falls back to the production URL when no site URL is configured', () => {
		expect(buildLocalBusinessJsonLd(undefined).url).toBe('https://www.capecod.world/');
	});
});
