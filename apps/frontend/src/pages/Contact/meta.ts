import { seo } from '@/lib/seo.ts';

export const contactMeta = (relativeUrl?: string) => {
	return {
		meta: [
			...seo({
				title: 'Contact | Free Website Review for Cape Cod Businesses | Cape Cod World',
				description:
					'Get a free, plain-English review of your website from a Cape Cod web designer. Serving Hyannis, Falmouth, Chatham, Provincetown, the Islands and the South Shore. Replies within one business day.',
				relativeUrl,
			}),
		],
	};
};
