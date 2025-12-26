import { getImageDimensions } from '@sanity/asset-utils';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { PortableTextComponentProps } from '@portabletext/react';
import type { SanityImageSource } from '@sanity/asset-utils';

import { dataset, projectId } from '@/sanity/projectDetails';

type SanityImageAssetWithAlt = SanityImageSource & { alt?: string };

export function SanityImage(props: PortableTextComponentProps<SanityImageAssetWithAlt>) {
  const { value, isInline } = props;

  const image = value;
  if (!image) {
    return null;
  }

  const { width, height } = getImageDimensions(value);

  return (
    <img
      className="not-prose h-auto w-full"
      src={createImageUrlBuilder({ projectId, dataset })
        .image(image)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .url()}
      alt={value.alt || ''}
      loading="lazy"
      style={{
        display: isInline ? 'inline-block' : 'block',
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
      }}
    />
  );
}
