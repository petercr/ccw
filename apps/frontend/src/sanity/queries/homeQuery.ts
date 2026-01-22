import { CATEGORIES_PER_PAGE, POSTS_PER_PAGE } from '@/constants/config.ts';
import { client } from '@/sanity/client.ts';
import { STUDIO_BASEPATH } from '@/sanity/constants.ts';
import { getPostsQuery } from '@/sanity/queries/postQuery.ts';
import type { CategoryStub } from '@/types/category.ts';
import { categoriesZ } from '@/types/category.ts';
import type { HomeDocument } from '@/types/home.ts';
import { homeZ } from '@/types/home.ts';
import type { PostStub } from '@/types/post.ts';
import { postsZ } from '@/types/post.ts';
import type { UnfilteredResponseQueryOptions } from '@sanity/client';
import { queryOptions } from '@tanstack/react-query';
import groq from 'groq';

// Groq query
export const HOME_QUERY = groq`{
  "homeData": *[_type == "home"][0]{ 
    title, 
    subTitle, 
    headingCard1, 
    headingCard2, 
    headingCard3, 
    card1, 
    card2, 
    card3 
  },
  "postsData": ${getPostsQuery(POSTS_PER_PAGE)},
  "categoriesData": *[_type == "category"] | order(_createdAt desc)[0..${CATEGORIES_PER_PAGE}] { title, fullSlug, mainImage, description, _createdAt }
}`;

// Tanstack Query
export const homeQuery = (options: UnfilteredResponseQueryOptions) =>
	queryOptions({
		queryKey: ['home', options.perspective || 'published'],
		staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
		gcTime: 1000 * 60 * 10, // Keep in cache for 10 minutes
		queryFn: () => {
			return client
				.withConfig({ stega: { enabled: true, studioUrl: STUDIO_BASEPATH }, resultSourceMap: 'withKeyArraySelector' })
				.fetch<
					| {
							homeData?: HomeDocument | null;
							postsData?: Array<PostStub> | null;
							categoriesData?: Array<CategoryStub> | null;
					  }
					| undefined
				>(HOME_QUERY, { lastPublishedAt: null, lastId: null }, options)
				.then((res) => {
					if (!res.result) {
						return undefined;
					}

					// Safely parse each field, providing defaults if null/undefined
					// Using ?? to handle both null and undefined at runtime
					const homeData = res.result.homeData
						? homeZ.parse(res.result.homeData)
						: {
								title: null,
								subTitle: null,
								headingCard1: null,
								headingCard2: null,
								headingCard3: null,
								card1: null,
								card2: null,
								card3: null,
							};
					const postsData = res.result.postsData ? postsZ.parse(res.result.postsData) : [];
					const categoriesData = res.result.categoriesData ? categoriesZ.parse(res.result.categoriesData) : [];

					return {
						data: {
							homeData,
							postsData,
							categoriesData,
						},
						sourceMap: res.resultSourceMap,
					};
				});
		},
	});
