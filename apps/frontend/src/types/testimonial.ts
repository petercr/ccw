import { z } from 'zod';
import { sanityImageZ } from '@/types/sanitySchemas.ts';

export const testimonialZ = z.object({
  _id: z.string(),
  _type: z.literal('testimonial'),
  name: z.string(),
  mainImage: sanityImageZ.nullable(),
  body: z.string(),
  _createdAt: z.string(),
});

export type Testimonial = z.infer<typeof testimonialZ>;

export const testimonialsZ = z.array(testimonialZ);
