import { Route } from '@/routes/__root.tsx';
import type { SiteSettings } from '@/types/siteSettings.ts';

export function useSiteSettings(): SiteSettings | null {
	const { siteSettings } = Route.useLoaderData();
	return siteSettings ?? null;
}
