import { QueryClient } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';
import { homeLoader } from '../home';

vi.mock('@/lib/previewMode', () => ({
	validatePreviewToken: vi.fn(),
	detectPreviewMode: vi.fn(),
}));

describe('homeLoader', () => {
	it('should load home data correctly', async () => {
		const mockQueryClient = new QueryClient();
		const mockRequest = new Request('http://localhost?preview=true');

		const mockContext = {
			queryClient: mockQueryClient,
			request: mockRequest,
		};

		const result = await homeLoader({ context: mockContext });

		expect(result).toBeDefined();
		// Add more assertions based on the expected behavior of globalLayout
	});
});
