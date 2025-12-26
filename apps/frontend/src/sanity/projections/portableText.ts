import groq from 'groq';
import { enrichedImageProjection } from '@/sanity/projections/enrichedImage.ts';
import { imageCarouselProjection } from '@/sanity/projections/imageCarousel.ts';

export const portableTextProjection = groq`
  {
    ...,
    ${enrichedImageProjection},
    ${imageCarouselProjection}
  }
`;
