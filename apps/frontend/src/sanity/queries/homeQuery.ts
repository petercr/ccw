import { CATEGORIES_PER_PAGE, POSTS_PER_PAGE } from '@/constants/config.ts';
import { getPostsQuery } from '@/sanity/queries/postQuery.ts';
import { fetchHomeData } from '@/sanity/serverFunctions.ts';
import type { UnfilteredResponseQueryOptions } from '@sanity/client';
import { queryOptions } from '@tanstack/react-query';
import groq from 'groq';

// Groq query - exported for preview mode
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

// Tanstack Query - uses server function to ensure data is fetched server-side
export const homeQuery = (options: UnfilteredResponseQueryOptions) =>
	queryOptions({
		queryKey: ['home', options.perspective || 'published'],
		staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
		gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
		queryFn: () => fetchHomeData(),
	});
