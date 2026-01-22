import { ImageCarouselSerializer } from '@/components/PortableText/types/serializers/ImageCarouselSerializer/ImageCarouselSerializer.tsx';
import { AccordionSerializer } from './serializers/AccordionSerializer/AccordionSerializer.tsx';
import { EnrichedImageSerializer } from './serializers/EnrichedImageSerializer/EnrichedImageSerializer.tsx';

export const types = {
  accordion: AccordionSerializer,
  enrichedImage: EnrichedImageSerializer,
  imageCarousel: ImageCarouselSerializer,
};
