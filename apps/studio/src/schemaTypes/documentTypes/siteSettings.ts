import { Settings } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	icon: Settings,
	fields: [
		defineField({
			name: 'title',
			title: 'Site Title',
			type: 'string',
		}),
		defineField({
			name: 'socialLinks',
			title: 'Social Links',
			type: 'object',
			fields: [
				defineField({
					name: 'linkedin',
					title: 'LinkedIn URL',
					type: 'url',
					validation: (Rule) => Rule.uri({ scheme: ['https'] }),
				}),
				defineField({
					name: 'github',
					title: 'GitHub URL',
					type: 'url',
					validation: (Rule) => Rule.uri({ scheme: ['https'] }),
				}),
				defineField({
					name: 'twitter',
					title: 'X (Twitter) URL',
					type: 'url',
					validation: (Rule) => Rule.uri({ scheme: ['https'] }),
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare(selection) {
			return {
				...selection,
				title: selection.title || 'Site Settings',
			};
		},
	},
});
