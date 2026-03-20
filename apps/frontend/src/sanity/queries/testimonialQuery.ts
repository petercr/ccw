import { fetchTestimonials } from '@/sanity/serverFunctions.ts';
import type { UnfilteredResponseQueryOptions } from '@sanity/client';
import { queryOptions } from '@tanstack/react-query';
import groq from 'groq';

export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  _type,
  name,
  organization,
  mainImage,
  body,
  _createdAt
}`;

export const testimonialsQuery = (options: UnfilteredResponseQueryOptions) =>
	queryOptions({
		queryKey: ['testimonials', options.perspective || 'published'],
		staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
		gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
		queryFn: () => fetchTestimonials(),
	});
