import { dataset, projectId } from '@/sanity/projectDetails.ts';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityImageSrcBuilder = ({ id, width: imageWidth }: { id: string; width: number }) => {
  return createImageUrlBuilder({ projectId, dataset }).image(id).width(imageWidth).fit('max').auto('format').url();
};
