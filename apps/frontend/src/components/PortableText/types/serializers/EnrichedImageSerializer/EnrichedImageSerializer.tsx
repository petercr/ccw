import React from 'react';
import { getImageDimensions } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';
import { caption, credits, figcaption, figure, image } from './EnrichedImageSerializer.css';
import type { PortableTextTypeComponentProps } from '@portabletext/react';
import type { EnrichedImageBlock } from '@/types/sanitySchemas.ts';
import { dataset, projectId } from '@/sanity/projectDetails';

export const EnrichedImageSerializer: React.FC<PortableTextTypeComponentProps<EnrichedImageBlock>> = ({ value }) => {
  if (!value.image?.asset) {
    return null;
  }

  const imageValue = value.image.asset;
  const { width, height } = getImageDimensions(imageValue);
  const imageSrc = urlBuilder({ projectId, dataset }).image(imageValue).width(800).fit('max').auto('format').url();

  return (
    <figure className={figure}>
      <img
        className={image}
        src={imageSrc}
        alt={value.altText || value.caption || ''}
        loading="lazy"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          aspectRatio: width / height,
        }}
      />
      {(value.caption || value.altText || value.credits.name) && (
        <figcaption className={figcaption}>
          {value.caption && <div className={caption}>{value.caption}</div>}
          {value.altText && !value.caption && <div>{value.altText}</div>}
          {value.credits.name && <div className={credits}>Photo: {value.credits.name}</div>}
        </figcaption>
      )}
    </figure>
  );
};
