import { insertContactSubmission } from '@/db/client.ts';
import { type ContactFormInput, type ContactResponse, contactFormSchema } from '@/server/contact/schema.ts';
import { syncContactSubmissionToSanity } from '@/server/contact/syncContactSubmissionToSanity.ts';
import { sendContactReplyEmail } from '@/server/email/zohoSmtp.ts';

/**
 * Validates input, stores the submission in Neon, mirrors it to Sanity Studio,
 * and sends a Zoho auto-reply.
 *
 * Email and Sanity failures after a successful DB write are logged but do not fail
 * the request — the user should not be told the submission failed when it was already stored.
 */
export async function handleContactSubmission(raw: unknown): Promise<ContactResponse> {
	const parsed = contactFormSchema.safeParse(raw);
	if (!parsed.success) {
		const fieldErrors: Record<string, string> = {};
		for (const issue of parsed.error.issues) {
			const key = issue.path[0];
			if (typeof key === 'string' && !fieldErrors[key]) {
				fieldErrors[key] = issue.message;
			}
		}
		return {
			success: false,
			error: 'Validation failed',
			fieldErrors,
		};
	}

	const data: ContactFormInput = parsed.data;

	let submissionId: string;
	let submittedAt: string;
	try {
		const row = await insertContactSubmission({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			reasonForMessage: data.reasonForMessage,
			additionalInfo: data.additionalInfo ?? '',
		});
		submissionId = row.id;
		submittedAt = row.created_at;
		console.info('[contact] Stored submission', {
			id: submissionId,
			email: data.email,
		});
	} catch (error) {
		console.error('[contact] Failed to store submission', error);
		return {
			success: false,
			error: 'Unable to save your message. Please try again later.',
		};
	}

	try {
		const sanityResult = await syncContactSubmissionToSanity({
			neonId: submissionId,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			reasonForMessage: data.reasonForMessage,
			additionalInfo: data.additionalInfo,
			submittedAt,
		});
		if (sanityResult) {
			console.info('[contact] Synced submission to Sanity', {
				neonId: submissionId,
				sanityId: sanityResult.id,
			});
		}
	} catch (error) {
		// Submission is already saved in Neon — log and still return success
		console.error('[contact] Failed to sync submission to Sanity', {
			id: submissionId,
			email: data.email,
			error,
		});
	}

	try {
		await sendContactReplyEmail({
			to: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			reasonForMessage: data.reasonForMessage,
		});
	} catch (error) {
		// Submission is already saved — log and still return success
		console.error('[contact] Failed to send reply email', {
			id: submissionId,
			email: data.email,
			error,
		});
	}

	return {
		success: true,
		id: submissionId,
	};
}
