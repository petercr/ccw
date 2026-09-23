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

import { sendContactReplyEmail } from '../zohoSmtp.ts';

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

	it('BCCs peter@capecod.world by default', async () => {
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
				bcc: 'peter@capecod.world',
			}),
		);
	});

	it('uses ZOHO_SMTP_BCC when set', async () => {
		process.env.ZOHO_SMTP_BCC = 'alerts@capecod.world';

		await sendContactReplyEmail({
			to: 'jane@example.com',
			firstName: 'Jane',
			lastName: 'Doe',
			reasonForMessage: 'Website audit',
		});

		expect(sendMail).toHaveBeenCalledWith(
			expect.objectContaining({
				bcc: 'alerts@capecod.world',
			}),
		);
	});
});
