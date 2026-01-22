import type { PortableTextTypeComponentProps } from '@portabletext/react';
import urlBuilder from '@sanity/image-url';
import { useEffect, useState } from 'react';
import type { FC } from 'react';
import Slider from 'react-slick';
import {
  captionText,
  container,
  credits,
  figcaption,
  figure,
  image,
  sliderContainer,
} from './ImageCarouselSerializer.css.ts';

import { dataset, projectId } from '@/sanity/projectDetails';
import { fullWidthSection } from '@/styles/shared/fullWidthSection.css.ts';
import type { ImageCarouselBlock } from '@/types/sanitySchemas.ts';

export const ImageCarouselSerializer: FC<PortableTextTypeComponentProps<ImageCarouselBlock>> = ({
  value: { images, numberOfImagesToShow },
}) => {
  const SliderComponent = (Slider as any).default ?? Slider;
  const [screenWidth, setScreenWidth] = useState<number>(0); // Start at 0 to indicate not mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set initial screen width on mount
    setScreenWidth(window.innerWidth);
    setMounted(true);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!images?.length) {
    return null;
  }

  // Don't render carousel until mounted on client to avoid SSR/client mismatch
  // Server renders null, client renders the carousel after hydration
  if (!mounted) {
    return null;
  }

  // Calculate responsive image width: 90% of screen width but max 800px
  const imageWidth = Math.min(screenWidth * 0.9, 800);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: numberOfImagesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: true,
  };

  return (
    <div className={fullWidthSection}>
      <div className={container}>
        <div className={sliderContainer}>
          <SliderComponent {...settings} lazyLoad="anticipated">
            {images.map(({ image: imageValue, _key, altText, caption, credits: { name } }) => {
              if (!imageValue?.asset) {
                return null;
              }

              const { asset } = imageValue;
              const imageSrc = urlBuilder({ projectId, dataset })
                .image(asset)
                .width(Math.round(imageWidth))
                .fit('max')
                .auto('format')
                .url();

              return (
                <div key={_key}>
                  <figure className={figure}>
                    <img src={imageSrc} alt={altText || caption || ''} loading="lazy" className={image} />
                    {(caption || altText || name) && (
                      <figcaption className={figcaption}>
                        {caption && <div className={captionText}>{caption}</div>}
                        {altText && !caption && <div>{altText}</div>}
                        {name && <div className={credits}>Photo: {name}</div>}
                      </figcaption>
                    )}
                  </figure>
                </div>
              );
            })}
          </SliderComponent>
        </div>
      </div>
    </div>
  );
};
