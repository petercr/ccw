import { detectPreviewMode, validatePreviewToken } from '@/lib/previewMode';
import { STUDIO_BASEPATH } from '@/sanity/constants.ts';
import { DOCUMENT_QUERY, documentQuery } from '@/sanity/queries/documentQuery.ts';
import type { ClientPerspective, UnfilteredResponseQueryOptions } from '@sanity/client';
import type { QueryClient } from '@tanstack/react-query';
import { notFound } from '@tanstack/react-router';

export const documentLoader = async ({
	context,
	params,
}: {
	params: { _splat: string };
	context: { queryClient: QueryClient; request: Request | null };
}) => {
	// Detect if preview mode is active
	const isPreviewMode = await detectPreviewMode(context.request);
	validatePreviewToken(isPreviewMode);
	const previewToken = import.meta.env.SSR ? process.env.SANITY_READ_TOKEN : undefined;

	const options = {
		filterResponse: false,
		perspective: isPreviewMode ? ('drafts' as ClientPerspective) : ('published' as ClientPerspective),
		...(isPreviewMode && previewToken ? { token: previewToken } : {}),
		...(isPreviewMode ? { stega: { enabled: true, studioUrl: STUDIO_BASEPATH } } : {}),
	} as UnfilteredResponseQueryOptions;

	const initial = await context.queryClient.ensureQueryData(documentQuery(params._splat, options));

	// Unknown slug: respond with a real 404 so search engines do not index soft-404 pages.
	if (!initial || initial.data === null || initial.data === undefined) {
		throw notFound();
	}

	// Return options without stega to avoid type incompatibility
	const returnOptions = {
		filterResponse: false as const,
		perspective: options.perspective,
		...(options.token ? { token: options.token } : {}),
	};

	return {
		initial,
		query: DOCUMENT_QUERY,
		params: { fullSlug: params._splat },
		options: returnOptions,
		sanity: { isPreview: isPreviewMode },
	};
};
