import { type NeonQueryFunction, neon } from '@neondatabase/serverless';

let sql: NeonQueryFunction<false, false> | null = null;
let tableReady: Promise<void> | null = null;

/**
 * Returns a Neon SQL tagged-template client.
 * Throws if DATABASE_URL is not configured.
 */
export function getDb() {
	const databaseUrl = process.env.DATABASE_URL;
	if (!databaseUrl) {
		throw new Error('DATABASE_URL is not configured. Set it to your Neon connection string.');
	}
	if (!sql) {
		sql = neon(databaseUrl);
	}
	return sql;
}

/**
 * Ensures the contact_submissions table exists.
 * Safe to call on every request (runs once per process lifetime).
 */
export async function ensureContactSubmissionsTable(): Promise<void> {
	if (!tableReady) {
		tableReady = (async () => {
			const db = getDb();
			await db`
				CREATE TABLE IF NOT EXISTS contact_submissions (
					id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
					first_name TEXT NOT NULL,
					last_name TEXT NOT NULL,
					email TEXT NOT NULL,
					reason_for_message TEXT NOT NULL,
					additional_info TEXT,
					created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
				)
			`;
			await db`
				CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
				ON contact_submissions (created_at DESC)
			`;
			await db`
				CREATE INDEX IF NOT EXISTS contact_submissions_email_idx
				ON contact_submissions (email)
			`;
		})().catch((error) => {
			// Allow retry on next request if schema setup fails
			tableReady = null;
			throw error;
		});
	}
	await tableReady;
}

export interface ContactSubmissionInput {
	firstName: string;
	lastName: string;
	email: string;
	reasonForMessage: string;
	additionalInfo: string;
}

export interface ContactSubmissionRow {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	reason_for_message: string;
	additional_info: string | null;
	created_at: string;
}

export async function insertContactSubmission(input: ContactSubmissionInput): Promise<ContactSubmissionRow> {
	await ensureContactSubmissionsTable();
	const db = getDb();

	const rows = await db`
		INSERT INTO contact_submissions (
			first_name,
			last_name,
			email,
			reason_for_message,
			additional_info
		) VALUES (
			${input.firstName},
			${input.lastName},
			${input.email},
			${input.reasonForMessage},
			${input.additionalInfo || null}
		)
		RETURNING
			id,
			first_name,
			last_name,
			email,
			reason_for_message,
			additional_info,
			created_at
	`;

	const row = rows[0] as ContactSubmissionRow | undefined;
	if (!row) {
		throw new Error('Failed to insert contact submission: no row returned');
	}
	return row;
}
