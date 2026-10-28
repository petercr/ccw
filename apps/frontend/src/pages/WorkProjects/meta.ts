import { seo } from '@/lib/seo.ts';

export const workProjectsMeta = (relativeUrl?: string) => {
	return {
		meta: [
			...seo({
				title: 'Our Work | Websites Built for Cape Cod Businesses & Nonprofits | Cape Cod World',
				description:
					'Recent websites and apps built by Cape Cod World for small businesses and nonprofits. Fast, mobile-first, and easy for your own staff to update.',
				relativeUrl,
			}),
		],
	};
};
