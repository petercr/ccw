import { Home } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const home = defineType({
  name: 'home',
  title: 'Homepage',
  type: 'document',
  icon: Home,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title used on the front page',
      type: 'string',
    }),
    defineField({
      name: 'subTitle',
      title: 'Subtitle',
      type: 'string',
    }),
    // Heading Cards (Text Only)
    defineField({
      name: 'headingCard1',
      title: 'Heading Card 1',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'headingCard2',
      title: 'Heading Card 2',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'headingCard3',
      title: 'Heading Card 3',
      type: 'string',
      group: 'content',
    }),
    // Content Cards
    defineField({
      name: 'card1',
      title: 'Content Card 1 (Links & Text)',
      type: 'object',
      fields: [
        defineField({ name: 'text', type: 'text', title: 'Text' }),
        defineField({
          name: 'links',
          type: 'array',
          title: 'Links',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string', title: 'Label' },
                { name: 'url', type: 'url', title: 'URL' },
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'card2',
      title: 'Content Card 2 (Text Only)',
      type: 'object',
      fields: [defineField({ name: 'text', type: 'text', title: 'Text' })],
    }),
    defineField({
      name: 'card3',
      title: 'Content Card 3 (Interleaved Text & Buttons)',
      type: 'object',
      fields: [
        defineField({
          name: 'content',
          type: 'array',
          title: 'Content Blocks',
          of: [
            {
              type: 'object',
              name: 'textContent',
              title: 'Text Content',
              fields: [{ name: 'text', type: 'text', title: 'Text' }],
            },
            {
              type: 'object',
              name: 'buttonContent',
              title: 'Button',
              fields: [
                { name: 'label', type: 'string', title: 'Label' },
                { name: 'url', type: 'url', title: 'URL' },
              ],
            },
          ],
        }),
      ],
    }),
  ],
  groups: [{ name: 'content', title: 'Content' }],
  preview: {
    select: {
      title: 'title',
      subTitle: 'subTitle',
    },
  },
});
