/** @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test';
import BlockContent from './PortableText';
import type { PortableText } from '@/types/sanitySchemas';

const carousel = [
	{
		_type: 'imageCarousel' as const,
		_key: 'carousel',
		numberOfImagesToShow: 3,
		images: ['One', 'Two', 'Three', 'Four'].map((label, index) => ({
			_type: 'enrichedImage' as const,
			_key: `image-${index}`,
			image: {
				_type: 'image' as const,
				asset: { _type: 'reference' as const, _ref: `image-${index + 1}-800x600-jpg` },
			},
			altText: `Alt ${label}`,
			caption: `Caption ${label}`,
			credits: { name: 'Photographer' },
		})),
	},
] satisfies PortableText;

let resizeCallback: (() => void) | undefined;
const scrollTo = vi.fn();
const originalScrollTo = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo');

beforeEach(() => {
	vi.stubGlobal(
		'ResizeObserver',
		class {
			constructor(callback: () => void) {
				resizeCallback = callback;
			}
			observe() {}
			disconnect() {}
		},
	);
	vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(300);
	vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
		width: 300,
		height: 200,
		x: 0,
		y: 0,
		top: 0,
		right: 300,
		bottom: 200,
		left: 0,
		toJSON: () => ({}),
	});
	Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: scrollTo });
});

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
	if (originalScrollTo) Object.defineProperty(HTMLElement.prototype, 'scrollTo', originalScrollTo);
	else Reflect.deleteProperty(HTMLElement.prototype, 'scrollTo');
	scrollTo.mockClear();
	resizeCallback = undefined;
});

describe('Sanity image carousel', () => {
	it('includes every image, caption, alt text, and credit in server HTML', () => {
		const html = renderToString(<BlockContent value={carousel} />);
		expect(html).toContain('Caption One');
		expect(html).toContain('Caption Four');
		expect(html).toContain('Alt One');
		expect(html.replaceAll('<!-- -->', '')).toContain('Photo: Photographer');
		const rendered = new DOMParser().parseFromString(html, 'text/html');
		const renderedImages = rendered.querySelectorAll('img');
		expect(renderedImages).toHaveLength(4);
		expect(renderedImages[0].getAttribute('srcset')).toContain('w=320');
		expect(renderedImages[0].getAttribute('srcset')).toContain('w=2400');
		expect(renderedImages[0].getAttribute('sizes')).toContain('(max-width: 767px) 100vw');
		expect(renderedImages[0].getAttribute('sizes')).toContain('calc(50.00vw - 0.50rem)');
		expect(renderedImages[0].getAttribute('sizes')).toContain('calc(33.33vw - 0.67rem)');
	});

	it('navigates with buttons, indicators, and the keyboard', async () => {
		render(<BlockContent value={carousel} />);
		const track = screen.getByLabelText('Images; use arrow keys to browse');
		fireEvent.click(screen.getByRole('button', { name: 'Next images' }));
		expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ left: 300 }));
		fireEvent.keyDown(track, { key: 'End' });
		expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ left: 900 }));
		fireEvent.click(screen.getByRole('button', { name: 'Show images 1 to 1 of 4' }));
		expect(scrollTo).toHaveBeenLastCalledWith(expect.objectContaining({ left: 0 }));
		await waitFor(() =>
			expect(screen.getByRole('button', { name: 'Previous images' }).hasAttribute('disabled')).toBe(true),
		);
	});

	it('updates visible positions when the track widens', async () => {
		render(<BlockContent value={carousel} />);
		vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(900);
		act(() => resizeCallback?.());
		await waitFor(() => {
			expect(screen.getByRole('button', { name: 'Show images 1 to 3 of 4' })).toBeTruthy();
			expect(screen.queryByRole('button', { name: 'Show images 3 to 3 of 4' })).toBeNull();
		});
	});
});
