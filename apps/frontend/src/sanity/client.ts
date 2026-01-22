import { apiVersion, dataset, projectId } from '@/sanity/projectDetails.ts';
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});
