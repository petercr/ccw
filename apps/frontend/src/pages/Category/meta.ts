import { seo } from '@/lib/seo.ts';
import { dataset, projectId } from '@/sanity/projectDetails.ts';
import type { CategoryDocument } from '@/types/category.ts';
import { createImageUrlBuilder } from '@sanity/image-url';

export const categoryMeta = (document: CategoryDocument, relativeUrl?: string) => {
	const src = document.mainImage
		? createImageUrlBuilder({ projectId, dataset })
				.image(document.mainImage)
				.height(300)
				.fit('max')
				.auto('format')
				.url()
		: undefined;
	return {
		meta: [
			...seo({
				title: `${document.title || 'Cape Cod World'} | Cape Cod World`,
				description:
					document.seo?.description ||
					'Web design, development, content and AI integration for small businesses on Cape Cod, Massachusetts.',
				image: src,
				relativeUrl: relativeUrl,
				keywords: document.seo?.keywords,
			}),
		],
	};
};
