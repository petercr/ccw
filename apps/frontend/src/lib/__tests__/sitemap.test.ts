import { describe, expect, it } from 'vite-plus/test';
import { buildSitemapEntries, escapeXml, normalizeSiteUrl, renderSitemapXml, STATIC_SITEMAP_PATHS } from '../sitemap';

describe('normalizeSiteUrl', () => {
	it('strips a trailing slash and falls back when unset', () => {
		expect(normalizeSiteUrl('https://www.capecod.world/')).toBe('https://www.capecod.world');
		expect(normalizeSiteUrl(undefined)).toBe('https://www.capecod.world');
		expect(normalizeSiteUrl('')).toBe('https://www.capecod.world');
	});
});

describe('buildSitemapEntries', () => {
	it('lists static routes first, then CMS documents with a date-only lastmod', () => {
		const entries = buildSitemapEntries('https://example.com/', [
			{ fullSlug: 'design', _updatedAt: '2026-03-07T20:58:21Z' },
			{ fullSlug: '/deployment' },
		]);

		expect(entries.slice(0, STATIC_SITEMAP_PATHS.length).map((e) => e.loc)).toEqual([
			'https://example.com',
			'https://example.com/our-work',
			'https://example.com/testimonials',
			'https://example.com/contact',
		]);
		expect(entries.slice(STATIC_SITEMAP_PATHS.length)).toEqual([
			{ loc: 'https://example.com/design', lastmod: '2026-03-07' },
			{ loc: 'https://example.com/deployment', lastmod: undefined },
		]);
	});

	it('skips empty slugs and duplicates', () => {
		const entries = buildSitemapEntries('https://example.com', [
			{ fullSlug: '' },
			{ fullSlug: '   ' },
			{ fullSlug: 'contact' },
			{ fullSlug: 'design' },
			{ fullSlug: 'design' },
		]);
		const locs = entries.map((e) => e.loc);
		expect(locs.filter((l) => l === 'https://example.com/design')).toHaveLength(1);
		expect(locs.filter((l) => l === 'https://example.com/contact')).toHaveLength(1);
		expect(locs).not.toContain('https://example.com/');
	});
});

describe('renderSitemapXml', () => {
	it('produces a valid urlset with escaped locations', () => {
		const xml = renderSitemapXml([
			{ loc: 'https://example.com' },
			{ loc: 'https://example.com/a&b', lastmod: '2026-01-02' },
		]);
		expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
		expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
		expect(xml).toContain('<url><loc>https://example.com</loc></url>');
		expect(xml).toContain('<url><loc>https://example.com/a&amp;b</loc><lastmod>2026-01-02</lastmod></url>');
		expect(xml.trim().endsWith('</urlset>')).toBe(true);
	});

	it('escapes every XML special character', () => {
		expect(escapeXml(`<a href="x">'&'</a>`)).toBe('&lt;a href=&quot;x&quot;&gt;&apos;&amp;&apos;&lt;/a&gt;');
	});
});
