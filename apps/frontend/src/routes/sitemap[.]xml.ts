import { buildSitemapEntries, normalizeSiteUrl, renderSitemapXml, type SitemapDocument } from '@/lib/sitemap.ts';
import { client } from '@/sanity/client';
import { createFileRoute } from '@tanstack/react-router';
import groq from 'groq';

const SITE_URL = normalizeSiteUrl(import.meta.env.VITE_SITE_URL || process.env.VITE_SITE_URL);

const SITEMAP_QUERY = groq`*[_type in ["category", "post"] && defined(fullSlug)]{ fullSlug, _updatedAt }`;

export const Route = createFileRoute('/sitemap.xml')({
	server: {
		handlers: {
			GET: async () => {
				let docs: Array<SitemapDocument> = [];
				try {
					docs = await client.fetch<Array<SitemapDocument>>(SITEMAP_QUERY);
				} catch (error) {
					console.error('[sitemap] Failed to fetch documents', error);
				}

				return new Response(renderSitemapXml(buildSitemapEntries(SITE_URL, docs)), {
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
