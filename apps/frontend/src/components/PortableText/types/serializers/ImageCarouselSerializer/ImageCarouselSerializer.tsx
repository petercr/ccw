import type { PortableTextTypeComponentProps } from '@portabletext/react';
import { createImageUrlBuilder } from '@sanity/image-url';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, FC, KeyboardEvent } from 'react';
import {
	captionText,
	container,
	controls,
	credits,
	figcaption,
	figure,
	image,
	indicator,
	indicators,
	navButton,
	track,
} from './ImageCarouselSerializer.css.ts';

import { dataset, projectId } from '@/sanity/projectDetails';
import { fullWidthSection } from '@/styles/shared/fullWidthSection.css.ts';
import type { ImageCarouselBlock } from '@/types/sanitySchemas.ts';

const imageWidths = [320, 480, 640, 800, 960, 1200, 1600, 2000, 2400];

const slotSize = (count: number) =>
	count === 1 ? '100vw' : `calc(${(100 / count).toFixed(2)}vw - ${((count - 1) / count).toFixed(2)}rem)`;

export const ImageCarouselSerializer: FC<PortableTextTypeComponentProps<ImageCarouselBlock>> = ({
	value: { images, numberOfImagesToShow },
}) => {
	const validImages = images?.filter(({ image: imageValue }) => imageValue?.asset) ?? [];
	const trackRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState(0);
	const [visibleCount, setVisibleCount] = useState(1);
	const imageCount = validImages.length;
	const maxPosition = Math.max(0, imageCount - visibleCount);
	const requestedCount = Math.min(imageCount || 1, 5, Math.max(1, Math.round(numberOfImagesToShow || 1)));
	const imageSizes = `(max-width: 767px) 100vw, (max-width: 1199px) ${slotSize(Math.min(requestedCount, 2))}, ${slotSize(requestedCount)}`;

	useEffect(() => {
		const element = trackRef.current;
		if (!element || !imageCount) return;

		const updatePosition = () => {
			const slide = element.firstElementChild as HTMLElement | null;
			if (!slide) return;
			const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 0;
			const step = slide.getBoundingClientRect().width + gap;
			if (!step) return;
			const count = Math.max(1, Math.min(imageCount, Math.round((element.clientWidth + gap) / step)));
			setVisibleCount(count);
			setPosition(Math.min(imageCount - count, Math.max(0, Math.round(element.scrollLeft / step))));
		};

		const observer = new ResizeObserver(updatePosition);
		observer.observe(element);
		if (element.firstElementChild) observer.observe(element.firstElementChild);
		element.addEventListener('scroll', updatePosition, { passive: true });
		updatePosition();
		return () => {
			observer.disconnect();
			element.removeEventListener('scroll', updatePosition);
		};
	}, [imageCount, requestedCount]);

	if (!imageCount) return null;

	const goTo = (nextPosition: number) => {
		const element = trackRef.current;
		const slide = element?.firstElementChild as HTMLElement | null;
		if (!element || !slide) return;
		const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 0;
		const next = Math.min(maxPosition, Math.max(0, nextPosition));
		element.scrollTo({ left: next * (slide.getBoundingClientRect().width + gap) });
		setPosition(next);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.target !== event.currentTarget) return;
		switch (event.key) {
			case 'ArrowLeft':
				event.preventDefault();
				goTo(position - 1);
				break;
			case 'ArrowRight':
				event.preventDefault();
				goTo(position + 1);
				break;
			case 'Home':
				event.preventDefault();
				goTo(0);
				break;
			case 'End':
				event.preventDefault();
				goTo(maxPosition);
				break;
		}
	};

	// The scrollable image group needs keyboard focus for arrow, Home, and End navigation.
	/* oxlint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/prefer-tag-over-role */
	return (
		<div className={fullWidthSection}>
			<section className={container} aria-roledescription="carousel" aria-label="Image carousel">
				<div
					ref={trackRef}
					role="group"
					className={track}
					style={{ '--requested-count': requestedCount } as CSSProperties}
					tabIndex={maxPosition > 0 ? 0 : undefined}
					aria-label={maxPosition > 0 ? 'Images; use arrow keys to browse' : 'Images'}
					onKeyDown={handleKeyDown}
				>
					{validImages.map(({ image: imageValue, _key, altText, caption, credits: { name } }, index) => {
						const asset = imageValue?.asset;
						if (!asset) return null;
						const builder = createImageUrlBuilder({ projectId, dataset }).image(asset).fit('max').auto('format');
						const imageSrc = builder.width(800).url();
						const imageSrcSet = imageWidths.map((width) => `${builder.width(width).url()} ${width}w`).join(', ');

						return (
							<figure key={_key} className={figure} aria-label={`Image ${index + 1} of ${imageCount}`}>
								<img
									src={imageSrc}
									srcSet={imageSrcSet}
									sizes={imageSizes}
									alt={altText || caption || ''}
									loading={index === 0 ? 'eager' : 'lazy'}
									className={image}
								/>
								{(caption || altText || name) && (
									<figcaption className={figcaption}>
										{caption && <div className={captionText}>{caption}</div>}
										{altText && !caption && <div>{altText}</div>}
										{name && <div className={credits}>Photo: {name}</div>}
									</figcaption>
								)}
							</figure>
						);
					})}
				</div>
				{maxPosition > 0 && (
					<div className={controls}>
						<button
							type="button"
							className={navButton}
							onClick={() => goTo(position - 1)}
							disabled={position === 0}
							aria-label="Previous images"
						>
							<span aria-hidden="true">←</span>
						</button>
						<div className={indicators} aria-label="Carousel positions">
							{Array.from({ length: maxPosition + 1 }, (_, index) => (
								<button
									key={index}
									type="button"
									className={indicator}
									aria-label={`Show images ${index + 1} to ${Math.min(imageCount, index + visibleCount)} of ${imageCount}`}
									aria-current={index === position ? 'true' : undefined}
									onClick={() => goTo(index)}
								/>
							))}
						</div>
						<button
							type="button"
							className={navButton}
							onClick={() => goTo(position + 1)}
							disabled={position === maxPosition}
							aria-label="Next images"
						>
							<span aria-hidden="true">→</span>
						</button>
					</div>
				)}
			</section>
		</div>
	);
	/* oxlint-enable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/prefer-tag-over-role */
};
