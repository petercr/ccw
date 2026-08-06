import { apiVersion, dataset, projectId } from '@/sanity/projectDetails.ts';
import { createClient, type SanityClient } from '@sanity/client';

export interface ContactSubmissionSanityInput {
	neonId: string;
	firstName: string;
	lastName: string;
	email: string;
	reasonForMessage: string;
	additionalInfo?: string | null;
	submittedAt: string;
}

/** Deterministic Sanity document id for a Neon row (idempotent creates). */
export function contactSubmissionDocumentId(neonId: string): string {
	// Sanity document ids: a-zA-Z0-9._- ; UUID hyphens are fine
	return `contactSubmission-${neonId}`;
}

let writeClient: SanityClient | null = null;

/**
 * Server-only Sanity client with a write token.
 * Returns null when SANITY_WRITE_TOKEN is not configured (sync is skipped).
 */
export function getSanityWriteClient(): SanityClient | null {
	const token = process.env.SANITY_WRITE_TOKEN;
	if (!token) {
		return null;
	}
	if (!writeClient) {
		writeClient = createClient({
			projectId,
			dataset,
			apiVersion,
			token,
			useCdn: false,
			perspective: 'raw',
		});
	}
	return writeClient;
}

/**
 * Creates a contactSubmission document in Sanity if one does not already exist for this neonId.
 * Idempotent via fixed document id `contactSubmission-{neonId}`.
 *
 * Throws on API/network errors so the caller can log and soft-fail.
 * No-ops (returns null) when SANITY_WRITE_TOKEN is missing.
 */
export async function syncContactSubmissionToSanity(
	input: ContactSubmissionSanityInput,
): Promise<{ id: string; created: boolean } | null> {
	const client = getSanityWriteClient();
	if (!client) {
		console.warn('[contact] SANITY_WRITE_TOKEN not set; skipping Sanity sync', {
			neonId: input.neonId,
		});
		return null;
	}

	const documentId = contactSubmissionDocumentId(input.neonId);

	const result = await client.createIfNotExists({
		_id: documentId,
		_type: 'contactSubmission',
		firstName: input.firstName,
		lastName: input.lastName,
		email: input.email,
		reasonForMessage: input.reasonForMessage,
		additionalInfo: input.additionalInfo || undefined,
		submittedAt: input.submittedAt,
		neonId: input.neonId,
		responseStatus: 'new',
	});

	// createIfNotExists returns the existing doc if already present; _createdAt equals
	// when Sanity first created it — not a perfect "created" flag, but we only care that it exists.
	const created = result._id === documentId;

	return { id: result._id, created };
}
