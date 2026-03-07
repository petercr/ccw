import { detectPreviewMode } from '@/lib/previewMode';
import { fetchSiteSettings } from '@/sanity/serverFunctions.ts';
import type { QueryClient } from '@tanstack/react-query';

export const globalLayout = async ({ context }: { context: { queryClient: QueryClient; request: Request | null } }) => {
	const isPreviewMode = await detectPreviewMode(context.request);

	const siteSettings = await fetchSiteSettings();

	return {
		sanity: { isPreview: isPreviewMode },
		siteSettings: siteSettings.data,
	};
};
