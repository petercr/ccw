import { seo } from '@/lib/seo.ts';

export const testimonialsMeta = (relativeUrl?: string) => {
	return {
		meta: [
			...seo({
				title: 'Testimonials',
				description: 'What our clients say about us.',
				relativeUrl,
			}),
		],
	};
};
