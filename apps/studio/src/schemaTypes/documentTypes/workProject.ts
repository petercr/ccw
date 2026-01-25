import { Briefcase } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const workProject = defineType({
	name: 'workProject',
	title: 'Our Work',
	type: 'document',
	icon: Briefcase,
	fields: [
		defineField({
			name: 'name',
			title: 'Project name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'mainImage',
			title: 'Main image',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'link',
			title: 'Project link',
			type: 'object',
			fields: [
				defineField({
					name: 'label',
					title: 'Display text',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: 'url',
					title: 'URL',
					type: 'url',
					validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'name',
			media: 'mainImage',
			subtitle: 'description',
		},
		prepare(selection) {
			const { subtitle } = selection as { subtitle?: string };
			return {
				...selection,
				subtitle: subtitle ? subtitle.slice(0, 80) : undefined,
			};
		},
	},
});
