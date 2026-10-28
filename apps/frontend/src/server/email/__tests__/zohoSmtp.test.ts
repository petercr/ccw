/** @vitest-environment node */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const { sendMail } = vi.hoisted(() => {
	const sendMail = vi.fn();
	return { sendMail };
});

vi.mock('nodemailer', () => ({
	default: {
		createTransport: vi.fn(() => ({ sendMail })),
	},
}));

import { sendContactNotificationEmail, sendContactReplyEmail } from '../zohoSmtp.ts';

describe('sendContactReplyEmail', () => {
	const originalEnv = process.env;

	beforeEach(() => {
		vi.clearAllMocks();
		process.env = {
			...originalEnv,
			ZOHO_SMTP_USER: 'hello@capecod.world',
			ZOHO_SMTP_PASS: 'secret',
			ZOHO_SMTP_FROM: 'hello@capecod.world',
		};
		delete process.env.ZOHO_SMTP_BCC;
		sendMail.mockResolvedValue({ messageId: 'msg-1' });
	});

	afterEach(() => {
		process.env = originalEnv;
	});

	it('sends the auto-reply to the submitter only', async () => {
		await sendContactReplyEmail({
			to: 'jane@example.com',
			firstName: 'Jane',
			lastName: 'Doe',
			reasonForMessage: 'Website audit',
		});

		expect(sendMail).toHaveBeenCalledWith(
			expect.objectContaining({
				to: 'jane@example.com',
				from: 'hello@capecod.world',
			}),
		);
		expect(sendMail.mock.calls[0][0]).not.toHaveProperty('bcc');
	});
});

describe('sendContactNotificationEmail', () => {
	const originalEnv = process.env;

	const payload = {
		submissionId: 'uuid-1',
		firstName: 'Jane',
		lastName: 'Doe',
		email: 'jane@example.com',
		reasonForMessage: 'Website audit',
		additionalInfo: 'Please review <my> site',
		submittedAt: '2026-04-01T12:00:00.000Z',
		sanityDocumentId: 'contactSubmission-uuid-1',
	};

	beforeEach(() => {
		vi.clearAllMocks();
		process.env = {
			...originalEnv,
			ZOHO_SMTP_USER: 'hello@capecod.world',
			ZOHO_SMTP_PASS: 'secret',
			ZOHO_SMTP_FROM: 'hello@capecod.world',
		};
		delete process.env.CONTACT_NOTIFY_TO;
		delete process.env.ZOHO_SMTP_BCC;
		delete process.env.SANITY_STUDIO_URL;
		sendMail.mockResolvedValue({ messageId: 'msg-2' });
	});

	afterEach(() => {
		process.env = originalEnv;
	});

	it('emails peter@capecod.world by default with Reply-To set to the submitter', async () => {
		await sendContactNotificationEmail(payload);

		expect(sendMail).toHaveBeenCalledWith(
			expect.objectContaining({
				from: 'hello@capecod.world',
				to: 'peter@capecod.world',
				replyTo: 'jane@example.com',
				subject: 'New contact form submission: Jane Doe — Website audit',
			}),
		);
	});

	it('includes the full message (escaped in HTML) and a Studio link', async () => {
		await sendContactNotificationEmail(payload);

		const { text, html } = sendMail.mock.calls[0][0];
		expect(text).toContain('Please review <my> site');
		expect(html).toContain('Please review &lt;my&gt; site');
		expect(text).toContain(
			'https://capecodworld.sanity.studio/sand-dune/intent/edit/id=contactSubmission-uuid-1;type=contactSubmission',
		);
	});

	it('uses SANITY_STUDIO_URL for the Studio link when set', async () => {
		process.env.SANITY_STUDIO_URL = 'http://localhost:3333/';

		await sendContactNotificationEmail(payload);

		expect(sendMail.mock.calls[0][0].text).toContain(
			'http://localhost:3333/sand-dune/intent/edit/id=contactSubmission-uuid-1;type=contactSubmission',
		);
	});

	it('falls back to the submission id when there is no Sanity document', async () => {
		await sendContactNotificationEmail({ ...payload, sanityDocumentId: undefined });

		const { text } = sendMail.mock.calls[0][0];
		expect(text).not.toContain('/intent/edit/');
		expect(text).toContain('Submission id: uuid-1');
	});

	it('uses CONTACT_NOTIFY_TO, then legacy ZOHO_SMTP_BCC, for the recipient', async () => {
		process.env.ZOHO_SMTP_BCC = 'legacy@capecod.world';
		await sendContactNotificationEmail(payload);
		expect(sendMail).toHaveBeenLastCalledWith(expect.objectContaining({ to: 'legacy@capecod.world' }));

		process.env.CONTACT_NOTIFY_TO = 'alerts@capecod.world';
		await sendContactNotificationEmail(payload);
		expect(sendMail).toHaveBeenLastCalledWith(expect.objectContaining({ to: 'alerts@capecod.world' }));
	});
});
