import { seo } from '@/lib/seo.ts';

export const contactMeta = (relativeUrl?: string) => {
	return {
		meta: [
			...seo({
				title: 'Contact',
				description: 'Get in touch with us.',
				relativeUrl,
			}),
		],
	};
};
