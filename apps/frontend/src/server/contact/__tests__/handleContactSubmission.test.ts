import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/db/client.ts', () => ({
	insertContactSubmission: vi.fn(),
}));

vi.mock('@/server/email/zohoSmtp.ts', () => ({
	sendContactReplyEmail: vi.fn(),
}));

import { insertContactSubmission } from '@/db/client.ts';
import { sendContactReplyEmail } from '@/server/email/zohoSmtp.ts';
import { handleContactSubmission } from '../handleContactSubmission.ts';

const insertMock = vi.mocked(insertContactSubmission);
const emailMock = vi.mocked(sendContactReplyEmail);

describe('handleContactSubmission', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const valid = {
		firstName: 'Jane',
		lastName: 'Doe',
		email: 'jane@example.com',
		reasonForMessage: 'Website audit',
		additionalInfo: 'Please review my site',
	};

	it('returns field errors for invalid input without writing to DB', async () => {
		const result = await handleContactSubmission({ firstName: '' });
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.fieldErrors).toBeDefined();
		}
		expect(insertMock).not.toHaveBeenCalled();
		expect(emailMock).not.toHaveBeenCalled();
	});

	it('stores submission and sends email on success', async () => {
		insertMock.mockResolvedValue({
			id: 'uuid-1',
			first_name: 'Jane',
			last_name: 'Doe',
			email: 'jane@example.com',
			reason_for_message: 'Website audit',
			additional_info: 'Please review my site',
			created_at: new Date().toISOString(),
		});
		emailMock.mockResolvedValue(undefined);

		const result = await handleContactSubmission(valid);

		expect(result).toEqual({ success: true, id: 'uuid-1' });
		expect(insertMock).toHaveBeenCalledWith({
			firstName: 'Jane',
			lastName: 'Doe',
			email: 'jane@example.com',
			reasonForMessage: 'Website audit',
			additionalInfo: 'Please review my site',
		});
		expect(emailMock).toHaveBeenCalledWith({
			to: 'jane@example.com',
			firstName: 'Jane',
			lastName: 'Doe',
			reasonForMessage: 'Website audit',
		});
	});

	it('returns error when DB insert fails', async () => {
		insertMock.mockRejectedValue(new Error('db down'));

		const result = await handleContactSubmission(valid);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toMatch(/Unable to save/i);
		}
		expect(emailMock).not.toHaveBeenCalled();
	});

	it('still succeeds when email fails after DB write', async () => {
		insertMock.mockResolvedValue({
			id: 'uuid-2',
			first_name: 'Jane',
			last_name: 'Doe',
			email: 'jane@example.com',
			reason_for_message: 'Website audit',
			additional_info: null,
			created_at: new Date().toISOString(),
		});
		emailMock.mockRejectedValue(new Error('smtp down'));

		const result = await handleContactSubmission(valid);

		expect(result).toEqual({ success: true, id: 'uuid-2' });
		expect(emailMock).toHaveBeenCalled();
	});
});
