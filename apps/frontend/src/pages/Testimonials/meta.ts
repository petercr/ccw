import { seo } from '@/lib/seo.ts';

export const testimonialsMeta = (relativeUrl?: string) => {
	return {
		meta: [
			...seo({
				title: 'Testimonials | What Cape Cod Clients Say | Cape Cod World',
				description:
					'What clients say about working with Cape Cod World, a Cape Cod web design and development studio, on their websites, branding and digital projects.',
				relativeUrl,
			}),
		],
	};
};
