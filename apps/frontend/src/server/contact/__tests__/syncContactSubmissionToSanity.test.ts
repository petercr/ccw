import { beforeEach, describe, expect, it, vi } from 'vitest';

const createIfNotExists = vi.fn();
const createClient = vi.fn((_config?: unknown) => ({ createIfNotExists }));

vi.mock('@sanity/client', () => ({
	createClient: (config: unknown) => createClient(config),
}));

vi.mock('@/sanity/projectDetails.ts', () => ({
	projectId: 'test-project',
	dataset: 'production',
	apiVersion: '2024-01-01',
}));

describe('syncContactSubmissionToSanity', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.resetModules();
		delete process.env.SANITY_WRITE_TOKEN;
	});

	const input = {
		neonId: 'abc-123',
		firstName: 'Jane',
		lastName: 'Doe',
		email: 'jane@example.com',
		reasonForMessage: 'Hello',
		additionalInfo: 'More info',
		submittedAt: '2026-04-01T12:00:00.000Z',
	};

	it('returns null and does not call Sanity when write token is missing', async () => {
		const { syncContactSubmissionToSanity } = await import('../syncContactSubmissionToSanity.ts');
		const result = await syncContactSubmissionToSanity(input);
		expect(result).toBeNull();
		expect(createClient).not.toHaveBeenCalled();
	});

	it('creates a document with deterministic id when token is set', async () => {
		process.env.SANITY_WRITE_TOKEN = 'write-token';
		createIfNotExists.mockResolvedValue({ _id: 'contactSubmission-abc-123' });

		const { syncContactSubmissionToSanity, contactSubmissionDocumentId } = await import(
			'../syncContactSubmissionToSanity.ts'
		);

		const result = await syncContactSubmissionToSanity(input);

		expect(contactSubmissionDocumentId('abc-123')).toBe('contactSubmission-abc-123');
		expect(createClient).toHaveBeenCalledWith(
			expect.objectContaining({
				projectId: 'test-project',
				dataset: 'production',
				token: 'write-token',
				useCdn: false,
			}),
		);
		expect(createIfNotExists).toHaveBeenCalledWith({
			_id: 'contactSubmission-abc-123',
			_type: 'contactSubmission',
			firstName: 'Jane',
			lastName: 'Doe',
			email: 'jane@example.com',
			reasonForMessage: 'Hello',
			additionalInfo: 'More info',
			submittedAt: '2026-04-01T12:00:00.000Z',
			neonId: 'abc-123',
			responseStatus: 'new',
		});
		expect(result).toEqual({ id: 'contactSubmission-abc-123', created: true });
	});
});
