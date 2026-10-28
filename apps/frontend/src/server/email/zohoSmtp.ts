import nodemailer from 'nodemailer';

export interface ReplyEmailPayload {
	to: string;
	firstName: string;
	lastName: string;
	reasonForMessage: string;
}

export interface NotificationEmailPayload {
	submissionId: string;
	firstName: string;
	lastName: string;
	email: string;
	reasonForMessage: string;
	additionalInfo?: string | null;
	submittedAt: string;
	/** Sanity document id, when the submission was mirrored to Studio. */
	sanityDocumentId?: string;
}

const DEFAULT_NOTIFY_TO = 'peter@capecod.world';
const DEFAULT_STUDIO_URL = 'https://capecodworld.sanity.studio';

function getSmtpConfig() {
	const host = process.env.ZOHO_SMTP_HOST ?? 'smtp.zoho.com';
	const port = Number(process.env.ZOHO_SMTP_PORT ?? '465');
	const user = process.env.ZOHO_SMTP_USER;
	const pass = process.env.ZOHO_SMTP_PASS;
	const from = process.env.ZOHO_SMTP_FROM ?? user;
	// ZOHO_SMTP_BCC is the legacy name from when owners were BCC'd on the auto-reply.
	const notifyTo = process.env.CONTACT_NOTIFY_TO ?? process.env.ZOHO_SMTP_BCC ?? DEFAULT_NOTIFY_TO;

	if (!user || !pass || !from) {
		throw new Error('Zoho SMTP is not configured. Set ZOHO_SMTP_USER, ZOHO_SMTP_PASS, and optionally ZOHO_SMTP_FROM.');
	}

	return {
		host,
		port,
		secure: port === 465,
		auth: { user, pass },
		from,
		notifyTo,
	};
}

function createTransporter(config: ReturnType<typeof getSmtpConfig>) {
	return nodemailer.createTransport({
		host: config.host,
		port: config.port,
		secure: config.secure,
		auth: config.auth,
	});
}

/**
 * Sends an automated reply to a contact form submitter via Zoho SMTP.
 */
export async function sendContactReplyEmail(payload: ReplyEmailPayload): Promise<void> {
	const config = getSmtpConfig();
	const transporter = createTransporter(config);

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

/**
 * Notifies the site owner (CONTACT_NOTIFY_TO) of a new contact form submission via Zoho SMTP.
 * Reply-To is the submitter, so replying from the inbox goes straight to them.
 */
export async function sendContactNotificationEmail(payload: NotificationEmailPayload): Promise<void> {
	const config = getSmtpConfig();
	const transporter = createTransporter(config);

	const displayName = [payload.firstName, payload.lastName].filter(Boolean).join(' ').trim();
	const subject = `New contact form submission: ${displayName} — ${payload.reasonForMessage}`.replace(/\s+/g, ' ');
	const studioLink = payload.sanityDocumentId ? getStudioEditUrl(payload.sanityDocumentId) : undefined;
	const additionalInfo = payload.additionalInfo?.trim() || '(none)';

	const text = [
		'New contact form submission on capecod.world',
		'',
		`Name: ${displayName}`,
		`Email: ${payload.email}`,
		`Reason: ${payload.reasonForMessage}`,
		`Submitted: ${payload.submittedAt}`,
		'',
		'Message:',
		additionalInfo,
		'',
		studioLink ? `Open in Studio: ${studioLink}` : `Submission id: ${payload.submissionId}`,
	].join('\n');

	const html = `
		<p><strong>New contact form submission on capecod.world</strong></p>
		<p>
			<strong>Name:</strong> ${escapeHtml(displayName)}<br>
			<strong>Email:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a><br>
			<strong>Reason:</strong> ${escapeHtml(payload.reasonForMessage)}<br>
			<strong>Submitted:</strong> ${escapeHtml(payload.submittedAt)}
		</p>
		<p><strong>Message:</strong></p>
		<p style="white-space: pre-wrap">${escapeHtml(additionalInfo)}</p>
		<p>${
			studioLink
				? `<a href="${escapeHtml(studioLink)}">Open in Sanity Studio</a>`
				: `Submission id: ${escapeHtml(payload.submissionId)}`
		}</p>
	`.trim();

	const info = await transporter.sendMail({
		from: config.from,
		to: config.notifyTo,
		replyTo: payload.email,
		subject,
		text,
		html,
	});

	console.info('[contact-email] Notification sent', {
		messageId: info.messageId,
		to: config.notifyTo,
		submissionId: payload.submissionId,
	});
}

function getStudioEditUrl(documentId: string): string {
	const studioUrl = (process.env.SANITY_STUDIO_URL || DEFAULT_STUDIO_URL).replace(/\/+$/, '');
	return `${studioUrl}/intent/edit/id=${encodeURIComponent(documentId)};type=contactSubmission`;
}

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}
