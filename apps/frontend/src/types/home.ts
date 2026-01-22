import { z } from 'zod';

const linkZ = z.object({
	label: z.string(),
	url: z.string().url(),
});

export const homeZ = z.object({
	title: z.string().nullable(),
	subTitle: z.string().nullable(),
	headingCard1: z.string().nullable().optional(),
	headingCard2: z.string().nullable().optional(),
	headingCard3: z.string().nullable().optional(),
	card1: z
		.object({
			text: z.string().nullable(),
			links: z.array(linkZ).nullable().optional(),
		})
		.nullable()
		.optional(),
	card2: z
		.object({
			text: z.string().nullable(),
		})
		.nullable()
		.optional(),
	card3: z
		.object({
			content: z
				.array(
					z.discriminatedUnion('_type', [
						z.object({ _type: z.literal('textContent'), text: z.string().nullable() }),
						z.object({ _type: z.literal('buttonContent'), label: z.string(), url: z.string().url() }),
					]),
				)
				.nullable()
				.optional(),
		})
		.nullable()
		.optional(),
});

export type HomeDocument = z.infer<typeof homeZ>;
