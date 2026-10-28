import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

vi.mock('@/db/client.ts', () => ({
	insertContactSubmission: vi.fn(),
}));

vi.mock('@/server/email/zohoSmtp.ts', () => ({
	sendContactReplyEmail: vi.fn(),
	sendContactNotificationEmail: vi.fn(),
}));

vi.mock('@/server/contact/syncContactSubmissionToSanity.ts', () => ({
	syncContactSubmissionToSanity: vi.fn(),
}));

import { insertContactSubmission } from '@/db/client.ts';
import { syncContactSubmissionToSanity } from '@/server/contact/syncContactSubmissionToSanity.ts';
import { sendContactNotificationEmail, sendContactReplyEmail } from '@/server/email/zohoSmtp.ts';
import { handleContactSubmission } from '../handleContactSubmission.ts';

const insertMock = vi.mocked(insertContactSubmission);
const emailMock = vi.mocked(sendContactReplyEmail);
const notifyMock = vi.mocked(sendContactNotificationEmail);
const sanityMock = vi.mocked(syncContactSubmissionToSanity);

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

	const createdAt = '2026-04-01T12:00:00.000Z';

	it.each(['https://spam.example', '   ', null, 123, ['spam'], { url: 'spam' }])(
		'silently discards a filled honeypot (%j) without storing, syncing, or emailing',
		async (website) => {
			const result = await handleContactSubmission({ ...valid, website });
			expect(result).toEqual({ success: true, id: expect.any(String) });
			expect(insertMock).not.toHaveBeenCalled();
			expect(sanityMock).not.toHaveBeenCalled();
			expect(emailMock).not.toHaveBeenCalled();
			expect(notifyMock).not.toHaveBeenCalled();
		},
	);

	it('silently discards honeypot submissions before validating the other fields', async () => {
		const result = await handleContactSubmission({ website: 'https://spam.example' });
		expect(result).toEqual({ success: true, id: expect.any(String) });
		expect(insertMock).not.toHaveBeenCalled();
		expect(sanityMock).not.toHaveBeenCalled();
		expect(emailMock).not.toHaveBeenCalled();
		expect(notifyMock).not.toHaveBeenCalled();
	});

	it('returns field errors for invalid input without writing to DB', async () => {
		const result = await handleContactSubmission({ firstName: '' });
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.fieldErrors).toBeDefined();
		}
		expect(insertMock).not.toHaveBeenCalled();
		expect(emailMock).not.toHaveBeenCalled();
		expect(sanityMock).not.toHaveBeenCalled();
	});

	it.each([undefined, ''])('stores submission, syncs to Sanity, and sends email with honeypot %j', async (website) => {
		insertMock.mockResolvedValue({
			id: 'uuid-1',
			first_name: 'Jane',
			last_name: 'Doe',
			email: 'jane@example.com',
			reason_for_message: 'Website audit',
			additional_info: 'Please review my site',
			created_at: createdAt,
		});
		sanityMock.mockResolvedValue({ id: 'contactSubmission-uuid-1', created: true });
		emailMock.mockResolvedValue(undefined);

		const result = await handleContactSubmission(website === undefined ? valid : { ...valid, website });

		expect(result).toEqual({ success: true, id: 'uuid-1' });
		expect(insertMock).toHaveBeenCalledWith({
			firstName: 'Jane',
			lastName: 'Doe',
			email: 'jane@example.com',
			reasonForMessage: 'Website audit',
			additionalInfo: 'Please review my site',
		});
		expect(sanityMock).toHaveBeenCalledWith({
			neonId: 'uuid-1',
			firstName: 'Jane',
			lastName: 'Doe',
			email: 'jane@example.com',
			reasonForMessage: 'Website audit',
			additionalInfo: 'Please review my site',
			submittedAt: createdAt,
		});
		expect(notifyMock).toHaveBeenCalledWith({
			submissionId: 'uuid-1',
			firstName: 'Jane',
			lastName: 'Doe',
			email: 'jane@example.com',
			reasonForMessage: 'Website audit',
			additionalInfo: 'Please review my site',
			submittedAt: createdAt,
			sanityDocumentId: 'contactSubmission-uuid-1',
		});
		expect(emailMock).toHaveBeenCalledWith({
			to: 'jane@example.com',
			firstName: 'Jane',
			lastName: 'Doe',
			reasonForMessage: 'Website audit',
		});
	});

	it('still succeeds and auto-replies when the owner notification fails', async () => {
		insertMock.mockResolvedValue({
			id: 'uuid-4',
			first_name: 'Jane',
			last_name: 'Doe',
			email: 'jane@example.com',
			reason_for_message: 'Website audit',
			additional_info: null,
			created_at: createdAt,
		});
		sanityMock.mockResolvedValue({ id: 'contactSubmission-uuid-4', created: true });
		notifyMock.mockRejectedValue(new Error('smtp down'));
		emailMock.mockResolvedValue(undefined);

		const result = await handleContactSubmission(valid);

		expect(result).toEqual({ success: true, id: 'uuid-4' });
		expect(notifyMock).toHaveBeenCalled();
		expect(emailMock).toHaveBeenCalled();
	});

	it('returns error when DB insert fails', async () => {
		insertMock.mockRejectedValue(new Error('db down'));

		const result = await handleContactSubmission(valid);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toMatch(/Unable to save/i);
		}
		expect(sanityMock).not.toHaveBeenCalled();
		expect(emailMock).not.toHaveBeenCalled();
		expect(notifyMock).not.toHaveBeenCalled();
	});

	it('still succeeds when email fails after DB write', async () => {
		insertMock.mockResolvedValue({
			id: 'uuid-2',
			first_name: 'Jane',
			last_name: 'Doe',
			email: 'jane@example.com',
			reason_for_message: 'Website audit',
			additional_info: null,
			created_at: createdAt,
		});
		sanityMock.mockResolvedValue({ id: 'contactSubmission-uuid-2', created: true });
		emailMock.mockRejectedValue(new Error('smtp down'));

		const result = await handleContactSubmission(valid);

		expect(result).toEqual({ success: true, id: 'uuid-2' });
		expect(emailMock).toHaveBeenCalled();
		expect(sanityMock).toHaveBeenCalled();
	});

	it('still succeeds when Sanity sync fails after DB write', async () => {
		insertMock.mockResolvedValue({
			id: 'uuid-3',
			first_name: 'Jane',
			last_name: 'Doe',
			email: 'jane@example.com',
			reason_for_message: 'Website audit',
			additional_info: null,
			created_at: createdAt,
		});
		sanityMock.mockRejectedValue(new Error('sanity down'));
		emailMock.mockResolvedValue(undefined);

		const result = await handleContactSubmission(valid);

		expect(result).toEqual({ success: true, id: 'uuid-3' });
		expect(sanityMock).toHaveBeenCalled();
		expect(emailMock).toHaveBeenCalled();
		expect(notifyMock).toHaveBeenCalledWith(expect.objectContaining({ sanityDocumentId: undefined }));
	});
});
