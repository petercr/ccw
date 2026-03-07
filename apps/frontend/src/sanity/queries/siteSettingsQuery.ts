import { fetchSiteSettings } from '@/sanity/serverFunctions.ts';
import type { UnfilteredResponseQueryOptions } from '@sanity/client';
import { queryOptions } from '@tanstack/react-query';
import groq from 'groq';

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings" && _id == "siteSettings"][0] {
  _id,
  _type,
  title,
  socialLinks
}`;

export const siteSettingsQuery = (options: UnfilteredResponseQueryOptions) =>
	queryOptions({
		queryKey: ['siteSettings', options.perspective || 'published'],
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 30,
		queryFn: () => fetchSiteSettings(),
	});
