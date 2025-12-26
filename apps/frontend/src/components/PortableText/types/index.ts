import { AccordionSerializer } from './serializers/AccordionSerializer/AccordionSerializer.tsx';
import { EnrichedImageSerializer } from './serializers/EnrichedImageSerializer/EnrichedImageSerializer.tsx';
import { ImageCarouselSerializer } from '@/components/PortableText/types/serializers/ImageCarouselSerializer/ImageCarouselSerializer.tsx';

export const types = {
  accordion: AccordionSerializer,
  enrichedImage: EnrichedImageSerializer,
  imageCarousel: ImageCarouselSerializer,
};
