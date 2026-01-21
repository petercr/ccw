import groq from 'groq';
import { queryOptions } from '@tanstack/react-query';
import type { UnfilteredResponseQueryOptions } from '@sanity/client';
import type { Testimonial } from '@/types/testimonial.ts';
import { testimonialsZ } from '@/types/testimonial.ts';
import { client } from '@/sanity/client.ts';
import { STUDIO_BASEPATH } from '@/sanity/constants.ts';

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
    queryFn: () =>
      client
        .withConfig({ stega: { enabled: true, studioUrl: STUDIO_BASEPATH }, resultSourceMap: true })
        .fetch<Array<Testimonial>>(TESTIMONIALS_QUERY, {}, options)
        .then((res) => ({
          data: testimonialsZ.parse(res.result),
          sourceMap: res.resultSourceMap,
        })),
  });
