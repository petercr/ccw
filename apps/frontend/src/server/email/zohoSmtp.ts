import nodemailer from 'nodemailer';

export interface ReplyEmailPayload {
	to: string;
	firstName: string;
	lastName: string;
	reasonForMessage: string;
}

function getSmtpConfig() {
	const host = process.env.ZOHO_SMTP_HOST ?? 'smtp.zoho.com';
	const port = Number(process.env.ZOHO_SMTP_PORT ?? '465');
	const user = process.env.ZOHO_SMTP_USER;
	const pass = process.env.ZOHO_SMTP_PASS;
	const from = process.env.ZOHO_SMTP_FROM ?? user;

	if (!user || !pass || !from) {
		throw new Error('Zoho SMTP is not configured. Set ZOHO_SMTP_USER, ZOHO_SMTP_PASS, and optionally ZOHO_SMTP_FROM.');
	}

	return {
		host,
		port,
		secure: port === 465,
		auth: { user, pass },
		from,
	};
}

/**
 * Sends an automated reply to a contact form submitter via Zoho SMTP.
 */
export async function sendContactReplyEmail(payload: ReplyEmailPayload): Promise<void> {
	const config = getSmtpConfig();

	const transporter = nodemailer.createTransport({
		host: config.host,
		port: config.port,
		secure: config.secure,
		auth: config.auth,
	});

	const displayName = [payload.firstName, payload.lastName].filter(Boolean).join(' ').trim();
	const subject = 'Thanks for contacting Cape Cod World — we received your message';

	const text = [
		`Hi ${displayName || 'there'},`,
		'',
		'Thanks for reaching out to Cape Cod World. We received your message and will get back to you soon.',
		'',
		`Reason you wrote about: ${payload.reasonForMessage}`,
		'',
		'— Cape Cod World',
	].join('\n');

	const html = `
		<p>Hi ${escapeHtml(displayName || 'there')},</p>
		<p>Thanks for reaching out to Cape Cod World. We received your message and will get back to you soon.</p>
		<p><strong>Reason you wrote about:</strong> ${escapeHtml(payload.reasonForMessage)}</p>
		<p>— Cape Cod World</p>
	`.trim();

	const info = await transporter.sendMail({
		from: config.from,
		to: payload.to,
		subject,
		text,
		html,
	});

	console.info('[contact-email] Reply sent', {
		messageId: info.messageId,
		to: payload.to,
	});
}

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}
