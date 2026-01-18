import groq from 'groq';
import { queryOptions } from '@tanstack/react-query';
import type { UnfilteredResponseQueryOptions } from '@sanity/client';
import type { WorkProject } from '@/types/workProject.ts';
import { workProjectsZ } from '@/types/workProject.ts';
import { client } from '@/sanity/client.ts';
import { STUDIO_BASEPATH } from '@/sanity/constants.ts';

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
    queryFn: () =>
      client
        .withConfig({ stega: { enabled: true, studioUrl: STUDIO_BASEPATH }, resultSourceMap: true })
        .fetch<Array<WorkProject>>(WORK_PROJECTS_QUERY, {}, options)
        .then((res) => ({
          data: workProjectsZ.parse(res.result),
          sourceMap: res.resultSourceMap,
        })),
  });
