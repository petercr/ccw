/** @vitest-environment node */
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

const { sql } = vi.hoisted(() => {
	const sql = vi.fn();
	return { sql };
});

vi.mock('@neondatabase/serverless', () => ({
	neon: vi.fn(() => sql),
}));

import { insertContactSubmission } from '../client.ts';

describe('insertContactSubmission', () => {
	const input = {
		firstName: 'Jane',
		lastName: 'Doe',
		email: 'jane@example.com',
		reasonForMessage: 'Website audit',
		additionalInfo: '',
	};

	const row = {
		id: 'uuid-1',
		first_name: 'Jane',
		last_name: 'Doe',
		email: 'jane@example.com',
		reason_for_message: 'Website audit',
		additional_info: null,
	};

	beforeEach(() => {
		vi.clearAllMocks();
		process.env.DATABASE_URL = 'postgres://test';
	});

	it('returns created_at as an ISO string when Neon parses TIMESTAMPTZ into a Date', async () => {
		sql.mockResolvedValue([{ ...row, created_at: new Date('2026-04-01T12:00:00.000Z') }]);

		const result = await insertContactSubmission(input);

		expect(result.created_at).toBe('2026-04-01T12:00:00.000Z');
	});

	it('passes through created_at when it is already a string', async () => {
		sql.mockResolvedValue([{ ...row, created_at: '2026-04-01T12:00:00.000Z' }]);

		const result = await insertContactSubmission(input);

		expect(result.created_at).toBe('2026-04-01T12:00:00.000Z');
	});
});
