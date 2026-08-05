import { describe, expect, it } from 'vitest';
import { contactFormSchema } from '../schema.ts';

describe('contactFormSchema', () => {
	const valid = {
		firstName: 'Jane',
		lastName: 'Doe',
		email: 'jane@example.com',
		reasonForMessage: 'Website audit',
		additionalInfo: 'Looking for a review',
	};

	it('accepts a valid payload', () => {
		const result = contactFormSchema.safeParse(valid);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.email).toBe('jane@example.com');
		}
	});

	it('trims whitespace fields', () => {
		const result = contactFormSchema.safeParse({
			...valid,
			firstName: '  Jane  ',
			reasonForMessage: '  Hello  ',
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.firstName).toBe('Jane');
			expect(result.data.reasonForMessage).toBe('Hello');
		}
	});

	it('defaults additionalInfo to empty string', () => {
		const { additionalInfo: _, ...withoutExtra } = valid;
		const result = contactFormSchema.safeParse(withoutExtra);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.additionalInfo).toBe('');
		}
	});

	it('rejects missing required fields', () => {
		const result = contactFormSchema.safeParse({});
		expect(result.success).toBe(false);
	});

	it('rejects invalid email', () => {
		const result = contactFormSchema.safeParse({ ...valid, email: 'not-an-email' });
		expect(result.success).toBe(false);
	});

	it('rejects empty first name', () => {
		const result = contactFormSchema.safeParse({ ...valid, firstName: '   ' });
		expect(result.success).toBe(false);
	});
});
