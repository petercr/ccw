import { fetchWorkProjects } from '@/sanity/serverFunctions.ts';
import type { UnfilteredResponseQueryOptions } from '@sanity/client';
import { queryOptions } from '@tanstack/react-query';
import groq from 'groq';

export const WORK_PROJECTS_QUERY = groq`*[_type == "workProject"] | order(_createdAt desc) {
  _id,
  _type,
  name,
  mainImage,
  description,
  link,
  _createdAt
}`;

export const workProjectsQuery = (options: UnfilteredResponseQueryOptions) =>
	queryOptions({
		queryKey: ['workProjects', options.perspective || 'published'],
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 10,
		queryFn: () => fetchWorkProjects(),
	});
