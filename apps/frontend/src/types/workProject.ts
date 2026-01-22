import { sanityImageZ } from '@/types/sanitySchemas.ts';
import { z } from 'zod';

export const workProjectLinkZ = z.object({
  label: z.string(),
  url: z.string(),
});

export const workProjectZ = z.object({
  _id: z.string(),
  _type: z.literal('workProject'),
  name: z.string(),
  mainImage: sanityImageZ.nullable(),
  description: z.string(),
  link: workProjectLinkZ.nullable(),
  _createdAt: z.string(),
});

export type WorkProject = z.infer<typeof workProjectZ>;

export const workProjectsZ = z.array(workProjectZ);
