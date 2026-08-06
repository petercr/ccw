import { Mail } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const RESPONSE_STATUS_OPTIONS = [
	{ title: 'New', value: 'new' },
	{ title: 'In progress', value: 'in_progress' },
	{ title: 'Replied', value: 'replied' },
	{ title: 'Closed', value: 'closed' },
	{ title: 'Spam', value: 'spam' },
] as const;

export const RESPONSE_CATEGORY_OPTIONS = [
	{ title: 'General', value: 'general' },
	{ title: 'Audit request', value: 'audit_request' },
	{ title: 'Partnership', value: 'partnership' },
	{ title: 'Support', value: 'support' },
	{ title: 'Other', value: 'other' },
] as const;

/**
 * Contact form submissions mirrored from Neon into Studio for editorial follow-up.
 * Form fields are read-only; editors update status, category, and internal notes.
 */
export const contactSubmission = defineType({
	name: 'contactSubmission',
	title: 'Contact submission',
	type: 'document',
	icon: Mail,
	// Submissions are created by the frontend write path; discourage manual creates.
	// Editors still need create: false at role level if available — UI hides new button via structure.
	fields: [
		defineField({
			name: 'firstName',
			title: 'First name',
			type: 'string',
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'lastName',
			title: 'Last name',
			type: 'string',
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'email',
			title: 'Email',
			type: 'string',
			readOnly: true,
			validation: (Rule) => Rule.required().email(),
		}),
		defineField({
			name: 'reasonForMessage',
			title: 'Reason for message',
			type: 'string',
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'additionalInfo',
			title: 'Additional info',
			type: 'text',
			rows: 4,
			readOnly: true,
		}),
		defineField({
			name: 'submittedAt',
			title: 'Submitted at',
			type: 'datetime',
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'neonId',
			title: 'Neon row ID',
			type: 'string',
			description: 'UUID from Neon contact_submissions for idempotency / linking',
			readOnly: true,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'responseStatus',
			title: 'Response status',
			type: 'string',
			options: {
				list: [...RESPONSE_STATUS_OPTIONS],
				layout: 'radio',
			},
			initialValue: 'new',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'responseCategory',
			title: 'Response category',
			type: 'string',
			options: {
				list: [...RESPONSE_CATEGORY_OPTIONS],
				layout: 'dropdown',
			},
		}),
		defineField({
			name: 'internalNotes',
			title: 'Internal notes',
			type: 'text',
			rows: 4,
			description: 'Editor-only follow-up notes (not shown to the submitter)',
		}),
		defineField({
			name: 'lastContactedAt',
			title: 'Last contacted at',
			type: 'datetime',
		}),
	],
	orderings: [
		{
			title: 'Submitted at, newest',
			name: 'submittedAtDesc',
			by: [{ field: 'submittedAt', direction: 'desc' }],
		},
		{
			title: 'Submitted at, oldest',
			name: 'submittedAtAsc',
			by: [{ field: 'submittedAt', direction: 'asc' }],
		},
		{
			title: 'Status',
			name: 'responseStatusAsc',
			by: [
				{ field: 'responseStatus', direction: 'asc' },
				{ field: 'submittedAt', direction: 'desc' },
			],
		},
	],
	preview: {
		select: {
			firstName: 'firstName',
			lastName: 'lastName',
			email: 'email',
			status: 'responseStatus',
			submittedAt: 'submittedAt',
			reason: 'reasonForMessage',
		},
		prepare({ firstName, lastName, email, status, submittedAt, reason }) {
			const name = [firstName, lastName].filter(Boolean).join(' ') || 'Unknown';
			const when = submittedAt
				? new Date(submittedAt).toLocaleString(undefined, {
						dateStyle: 'medium',
						timeStyle: 'short',
					})
				: '';
			const statusLabel =
				RESPONSE_STATUS_OPTIONS.find((o) => o.value === status)?.title ?? status ?? 'new';
			return {
				title: `${name} · ${statusLabel}`,
				subtitle: [email, reason, when].filter(Boolean).join(' · '),
			};
		},
	},
});
