import { enrichedImageProjection } from '@/sanity/projections/enrichedImage.ts';
import { imageCarouselProjection } from '@/sanity/projections/imageCarousel.ts';
import groq from 'groq';

export const portableTextProjection = groq`
  {
    ...,
    ${enrichedImageProjection},
    ${imageCarouselProjection}
  }
`;
