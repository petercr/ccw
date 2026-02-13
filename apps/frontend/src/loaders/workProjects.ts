import { detectPreviewMode, validatePreviewToken } from '@/lib/previewMode';
import { STUDIO_BASEPATH } from '@/sanity/constants.ts';
import { WORK_PROJECTS_QUERY, workProjectsQuery } from '@/sanity/queries/workProjectQuery.ts';
import type { ClientPerspective, UnfilteredResponseQueryOptions } from '@sanity/client';
import type { QueryClient } from '@tanstack/react-query';

export const workProjectsLoader = async ({
	context,
}: {
	context: { queryClient: QueryClient; request: Request | null };
}) => {
	const isPreviewMode = await detectPreviewMode(context.request);
	validatePreviewToken(isPreviewMode);
	const previewToken = import.meta.env.SSR ? process.env.SANITY_READ_TOKEN : undefined;

	const options = {
		filterResponse: false,
		perspective: isPreviewMode ? ('drafts' as ClientPerspective) : ('published' as ClientPerspective),
		...(isPreviewMode && previewToken ? { token: previewToken } : {}),
		...(isPreviewMode ? { stega: { enabled: true, studioUrl: STUDIO_BASEPATH } } : {}),
	} as UnfilteredResponseQueryOptions;

	const initial = await context.queryClient.ensureQueryData(workProjectsQuery(options));

	const returnOptions = {
		filterResponse: false as const,
		perspective: options.perspective as ClientPerspective,
		...(options.token ? { token: options.token } : {}),
	};

	return {
		initial,
		options: returnOptions,
		query: WORK_PROJECTS_QUERY,
		sanity: { isPreview: isPreviewMode },
	};
};
