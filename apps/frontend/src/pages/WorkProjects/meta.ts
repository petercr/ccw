import { seo } from '@/lib/seo.ts';

export const workProjectsMeta = (relativeUrl?: string) => {
  return {
    meta: [
      ...seo({
        title: 'Our Work',
        description: 'Projects we have worked on.',
        relativeUrl,
      }),
    ],
  };
};
