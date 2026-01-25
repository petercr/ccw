import { client } from '@/sanity/client.ts';
import { STUDIO_BASEPATH } from '@/sanity/constants.ts';
import { TESTIMONIALS_QUERY } from '@/sanity/queries/testimonialQuery.ts';
import { WORK_PROJECTS_QUERY } from '@/sanity/queries/workProjectQuery.ts';
import { testimonialsZ } from '@/types/testimonial.ts';
import { workProjectsZ } from '@/types/workProject.ts';
import type { ClientPerspective, UnfilteredResponseQueryOptions } from '@sanity/client';
import { createServerFn } from '@tanstack/react-start';

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
		.fetch(WORK_PROJECTS_QUERY, {}, options);

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
		.fetch(TESTIMONIALS_QUERY, {}, options);

	return {
		data: testimonialsZ.parse(res.result),
		sourceMap: res.resultSourceMap,
	};
});
