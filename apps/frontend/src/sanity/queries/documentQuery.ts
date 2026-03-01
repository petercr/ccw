import { CATEGORY_QUERY_FIELDS } from '@/sanity/queries/categoryQuery.ts';
import { POST_QUERY_FIELDS } from '@/sanity/queries/postQuery.ts';
import { fetchDocument } from '@/sanity/serverFunctions.ts';
import type { UnfilteredResponseQueryOptions } from '@sanity/client';
import { queryOptions } from '@tanstack/react-query';
import groq from 'groq';

// GROQ query - exported for preview mode
export const DOCUMENT_QUERY = groq`*[fullSlug == $fullSlug][0]{
  _id,
  _type,
  ...select(
    _type == "category" => {
      ${CATEGORY_QUERY_FIELDS}
    },
    _type == "post" => {
      ${POST_QUERY_FIELDS}
    }
  )
}`;

// Tanstack Query - uses server function to ensure data is fetched server-side
export const documentQuery = (fullSlug: string, options: UnfilteredResponseQueryOptions) => {
	return queryOptions({
		queryKey: ['documents', fullSlug, options.perspective || 'published'],
		staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
		gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
		queryFn: () => fetchDocument({ data: { fullSlug } }),
	});
};
