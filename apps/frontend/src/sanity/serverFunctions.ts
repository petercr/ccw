import { client } from '@/sanity/client.ts';
import { STUDIO_BASEPATH } from '@/sanity/constants.ts';
import { categoriesZ, categoryZ } from '@/types/category.ts';
import { homeZ } from '@/types/home.ts';
import { postsZ, postZ } from '@/types/post.ts';
import { testimonialsZ } from '@/types/testimonial.ts';
import { workProjectsZ } from '@/types/workProject.ts';
import type { ClientPerspective, UnfilteredResponseQueryOptions } from '@sanity/client';
import { sanityTypeLiterals } from '@santan/shared/types';
import { createServerFn } from '@tanstack/react-start';
import groq from 'groq';

// Define queries inline to avoid circular imports
const WORK_PROJECTS_QUERY_INTERNAL = groq`*[_type == "workProject"] | order(_createdAt desc) {
  _id,
  _type,
  name,
  mainImage,
  description,
  link,
  _createdAt
}`;

const TESTIMONIALS_QUERY_INTERNAL = groq`*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  _type,
  name,
  mainImage,
  body,
  _createdAt
}`;

// Home query fields
const POSTS_PER_PAGE = 6;
const CATEGORIES_PER_PAGE = 100;

const getPostsQueryInternal = (limit: number) => groq`
  *[
    _type == "post" &&
    (
      !defined($lastPublishedAt) ||
      publishedAt < $lastPublishedAt ||
      (publishedAt == $lastPublishedAt && _id < $lastId)
    )
  ]
  | order(publishedAt desc)[0...${limit}]{
    _id,
    title,
    fullSlug,
    ingress,
    mainImage,
    _createdAt,
    publishedAt
  }
`;

const HOME_QUERY_INTERNAL = groq`{
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
  "postsData": ${getPostsQueryInternal(POSTS_PER_PAGE)},
  "categoriesData": *[_type == "category"] | order(_createdAt desc)[0..${CATEGORIES_PER_PAGE}] { title, fullSlug, mainImage, description, _createdAt }
}`;

// Document query fields
const CATEGORY_QUERY_FIELDS_INTERNAL = groq`
  _id,
  title,
  fullSlug,
  description,
  mainImage,
  keywords,
  seo,
  _createdAt
`;

const POST_QUERY_FIELDS_INTERNAL = groq`
  _id,
  _key,
  title,
  fullSlug,
  "author": author->{ name, image },
  "categories": categories[]->{ title, description, slug },
  publishedAt,
  _updatedAt,
  mainImage,
  ingress,
  body[]
  {
    ...,
    _type == "enrichedImage" => {
      ...,
      credits->{
        name
      }
    },
    _type == "imageCarousel" => {
      ...,
      images[] {
        ...,
        credits->{
          name
        }
      }
    }
  },
  seo,
  _createdAt
`;

const DOCUMENT_QUERY_INTERNAL = groq`*[fullSlug == $fullSlug][0]{
  _id,
  _type,
  ...select(
    _type == "category" => {
      ${CATEGORY_QUERY_FIELDS_INTERNAL}
    },
    _type == "post" => {
      ${POST_QUERY_FIELDS_INTERNAL}
    }
  )
}`;

// Server function to fetch home data
export const fetchHomeData = createServerFn({
	method: 'GET',
}).handler(async () => {
	const options: UnfilteredResponseQueryOptions = {
		filterResponse: false,
		perspective: 'published' as ClientPerspective,
	};

	const res = await client
		.withConfig({ stega: { enabled: true, studioUrl: STUDIO_BASEPATH }, resultSourceMap: 'withKeyArraySelector' })
		.fetch(HOME_QUERY_INTERNAL, { lastPublishedAt: null, lastId: null }, options);

	if (!res.result) {
		return undefined;
	}

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

// Server function to fetch document by slug
export const fetchDocument = createServerFn({
	method: 'GET',
})
	.inputValidator((data: { fullSlug: string }) => data)
	.handler(async ({ data }) => {
	const options: UnfilteredResponseQueryOptions = {
		filterResponse: false,
		perspective: 'published' as ClientPerspective,
	};

	const res = await client
		.withConfig({ stega: { enabled: true, studioUrl: STUDIO_BASEPATH }, resultSourceMap: 'withKeyArraySelector' })
		.fetch(DOCUMENT_QUERY_INTERNAL, { fullSlug: data.fullSlug }, options);

	if (!res.result) {
		return {
			data: null,
			sourceMap: undefined,
		};
	}

	switch (res.result._type) {
		case sanityTypeLiterals.post:
			return {
				data: postZ.parse(res.result),
				sourceMap: res.resultSourceMap,
			};
		case sanityTypeLiterals.category:
			try {
				return {
					data: categoryZ.parse(res.result),
					sourceMap: res.resultSourceMap,
				};
			} catch (e) {
				console.log(e);
				return {
					data: null,
					sourceMap: undefined,
				};
			}
		default:
			return {
				data: null,
				sourceMap: undefined,
			};
	}
});

// Server function to fetch work projects
export const fetchWorkProjects = createServerFn({
	method: 'GET',
}).handler(async () => {
	const options: UnfilteredResponseQueryOptions = {
		filterResponse: false,
		perspective: 'published' as ClientPerspective,
	};

	const res = await client
		.withConfig({ stega: { enabled: true, studioUrl: STUDIO_BASEPATH }, resultSourceMap: 'withKeyArraySelector' })
		.fetch(WORK_PROJECTS_QUERY_INTERNAL, {}, options);

	return {
		data: workProjectsZ.parse(res.result),
		sourceMap: res.resultSourceMap,
	};
});

// Server function to fetch testimonials
export const fetchTestimonials = createServerFn({
	method: 'GET',
}).handler(async () => {
	const options: UnfilteredResponseQueryOptions = {
		filterResponse: false,
		perspective: 'published' as ClientPerspective,
	};

	const res = await client
		.withConfig({ stega: { enabled: true, studioUrl: STUDIO_BASEPATH }, resultSourceMap: 'withKeyArraySelector' })
		.fetch(TESTIMONIALS_QUERY_INTERNAL, {}, options);

	return {
		data: testimonialsZ.parse(res.result),
		sourceMap: res.resultSourceMap,
	};
});
