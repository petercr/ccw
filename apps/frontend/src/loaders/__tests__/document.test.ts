import { QueryClient } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';
import { documentLoader } from '../document';

vi.mock('@/lib/previewMode', () => ({
	validatePreviewToken: vi.fn(),
	detectPreviewMode: vi.fn(),
}));

describe('documentLoader', () => {
	it('should load document data correctly', async () => {
		const mockQueryClient = new QueryClient();
		const mockRequest = new Request('http://localhost?preview=true');

		const mockContext = {
			queryClient: mockQueryClient,
			request: mockRequest,
		};
		const mockParams = { _splat: 'test-document' };

		const result = await documentLoader({ context: mockContext, params: mockParams });

		expect(result).toBeDefined();
		// Add more assertions based on the expected behavior of documentLoader
	});
});
