import { z } from 'zod';

/** Shared contact form payload validated on client and server. */
export const contactFormSchema = z.object({
	firstName: z.string().trim().min(1, 'First name is required').max(100),
	lastName: z.string().trim().min(1, 'Last name is required').max(100),
	email: z.email('A valid email is required').max(254),
	reasonForMessage: z.string().trim().min(1, 'Reason for message is required').max(500),
	additionalInfo: z.string().trim().max(5000).optional().default(''),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const contactSuccessResponseSchema = z.object({
	success: z.literal(true),
	id: z.string(),
});

export const contactErrorResponseSchema = z.object({
	success: z.literal(false),
	error: z.string(),
	fieldErrors: z.record(z.string(), z.string()).optional(),
});

export type ContactSuccessResponse = z.infer<typeof contactSuccessResponseSchema>;
export type ContactErrorResponse = z.infer<typeof contactErrorResponseSchema>;
export type ContactResponse = ContactSuccessResponse | ContactErrorResponse;
