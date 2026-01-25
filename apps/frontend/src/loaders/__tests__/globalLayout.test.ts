import { QueryClient } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';
import { globalLayout } from '../globalLayout';

// Mocking the previewMode module to isolate the test from its implementation
vi.mock('@/lib/previewMode', () => ({
	validatePreviewToken: vi.fn(), // Mocking validatePreviewToken function
	detectPreviewMode: vi.fn(), // Mocking detectPreviewMode function
}));

// Test suite for the globalLayout function
describe('globalLayout', () => {
	it('should load global layout data correctly', async () => {
		// Setting up a mock QueryClient instance
		const mockQueryClient = new QueryClient();

		// Creating a mock Request object with a preview query parameter
		const mockRequest = new Request('http://localhost?preview=true');

		// Mock context to simulate the environment in which the loader operates
		const mockContext = {
			queryClient: mockQueryClient, // Mocked QueryClient instance
			request: mockRequest, // Mocked Request object
		};

		// Calling the globalLayout function with the mock context
		const result = await globalLayout({ context: mockContext });

		// Verifying that the loader returns a defined result
		expect(result).toBeDefined();
		// Add more assertions based on the expected behavior of globalLayout
	});
});
