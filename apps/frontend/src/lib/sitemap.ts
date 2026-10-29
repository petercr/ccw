export interface SitemapDocument {
	fullSlug: string;
	_updatedAt?: string;
}

export interface SitemapEntry {
	loc: string;
	lastmod?: string;
}

/** Static file routes that are always present in the sitemap, in display order. */
export const STATIC_SITEMAP_PATHS = ['', '/our-work', '/testimonials', '/contact'] as const;

export function escapeXml(value: string): string {
	const map: Record<string, string> = { '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' };
	return value.replace(/[<>&'"]/g, (c) => map[c] ?? c);
}

export function normalizeSiteUrl(siteUrl: string | undefined, fallback = 'https://www.capecod.world/'): string {
	return (siteUrl || fallback).replace(/\/$/, '');
}

/** Builds the list of sitemap entries from the static routes plus published CMS documents. */
export function buildSitemapEntries(siteUrl: string, docs: Array<SitemapDocument>): Array<SitemapEntry> {
	const base = normalizeSiteUrl(siteUrl);
	const seen = new Set<string>();
	const entries: Array<SitemapEntry> = [];

	for (const path of STATIC_SITEMAP_PATHS) {
		const loc = `${base}${path}`;
		seen.add(loc);
		entries.push({ loc });
	}

	for (const doc of docs) {
		const slug = (doc.fullSlug ?? '').trim().replace(/^\/+/, '');
		if (!slug) continue;
		const loc = `${base}/${slug}`;
		if (seen.has(loc)) continue;
		seen.add(loc);
		entries.push({ loc, lastmod: doc._updatedAt ? doc._updatedAt.slice(0, 10) : undefined });
	}

	return entries;
}

export function renderSitemapXml(entries: Array<SitemapEntry>): string {
	const urls = entries
		.map((e) => `  <url><loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`)
		.join('\n');
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
