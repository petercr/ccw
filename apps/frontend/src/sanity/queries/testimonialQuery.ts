import { fetchTestimonials } from '@/sanity/serverFunctions.ts';
import type { UnfilteredResponseQueryOptions } from '@sanity/client';
import { queryOptions } from '@tanstack/react-query';
import groq from 'groq';

export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  _type,
  name,
  mainImage,
  body,
  _createdAt
}`;

export const testimonialsQuery = (options: UnfilteredResponseQueryOptions) =>
  queryOptions({
    queryKey: ['testimonials', options.perspective || 'published'],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    queryFn: () => fetchTestimonials(),
  });
