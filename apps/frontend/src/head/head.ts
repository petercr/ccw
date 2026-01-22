import { categoryMeta } from '@/pages/Category/meta.ts';
import { postMeta } from '@/pages/Post/meta.ts';
import type { DocumentType } from '@/types/documentType.ts';
import { sanityTypeLiterals } from '@santan/shared/types';

export const head = (document?: DocumentType, relativeUrl?: string) => {
	if (!document) {
		return {};
	}
	switch (document._type) {
		case sanityTypeLiterals['category']:
			return categoryMeta(document, relativeUrl);

		case sanityTypeLiterals['post']:
			return postMeta(document, relativeUrl);

		default:
			return {
				meta: [],
			};
	}
};
