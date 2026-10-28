import { client } from '@/sanity/client';
import { createFileRoute } from '@tanstack/react-router';
import groq from 'groq';

const SITE_URL = (import.meta.env.VITE_SITE_URL || process.env.VITE_SITE_URL || 'https://www.capecod.world/').replace(
	/\/$/,
	'',
);

const STATIC_PATHS = ['', '/our-work', '/testimonials', '/contact'];

const SITEMAP_QUERY = groq`*[_type in ["category", "post"] && defined(fullSlug)]{ fullSlug, _updatedAt }`;

function escapeXml(value: string) {
	return value.replace(
		/[<>&'"]/g,
		(c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!,
	);
}

export const Route = createFileRoute('/sitemap.xml')({
	server: {
		handlers: {
			GET: async () => {
				let docs: Array<{ fullSlug: string; _updatedAt?: string }> = [];
				try {
					docs = await client.fetch(SITEMAP_QUERY);
				} catch (error) {
					console.error('[sitemap] Failed to fetch documents', error);
				}

				const entries = [
					...STATIC_PATHS.map((path) => ({ loc: `${SITE_URL}${path}`, lastmod: undefined as string | undefined })),
					...docs.map((doc) => ({
						loc: `${SITE_URL}/${doc.fullSlug.replace(/^\//, '')}`,
						lastmod: doc._updatedAt,
					})),
				];

				const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		(e) =>
			`  <url><loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod.slice(0, 10)}</lastmod>` : ''}</url>`,
	)
	.join('\n')}
</urlset>
`;

				return new Response(body, {
					status: 200,
					headers: {
						'Content-Type': 'application/xml; charset=utf-8',
						'Cache-Control': 'public, max-age=3600',
					},
				});
			},
		},
	},
});
