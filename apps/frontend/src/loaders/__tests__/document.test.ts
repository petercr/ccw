import { QueryClient } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vite-plus/test';
import { documentLoader } from '../document';

vi.mock('@/lib/previewMode', () => ({
	validatePreviewToken: vi.fn(),
	detectPreviewMode: vi.fn(),
}));

const fetchDocument = vi.fn();

vi.mock('@/sanity/serverFunctions.ts', () => ({
	fetchDocument: (...args: Array<unknown>) => fetchDocument(...args),
}));

function makeArgs() {
	return {
		context: { queryClient: new QueryClient(), request: new Request('http://localhost/test-document') },
		params: { _splat: 'test-document' },
	};
}

describe('documentLoader', () => {
	it('returns the document and query details when the slug exists', async () => {
		fetchDocument.mockResolvedValueOnce({ data: { _id: 'doc', _type: 'post' }, sourceMap: undefined });

		const result = await documentLoader(makeArgs());

		expect(result.initial.data).toEqual({ _id: 'doc', _type: 'post' });
		expect(result.params).toEqual({ fullSlug: 'test-document' });
		expect(result.sanity.isPreview).toBeFalsy();
	});

	it('throws a 404 notFound error when no document matches the slug', async () => {
		fetchDocument.mockResolvedValueOnce({ data: null, sourceMap: undefined });

		await expect(documentLoader(makeArgs())).rejects.toMatchObject({ isNotFound: true });
	});
});
