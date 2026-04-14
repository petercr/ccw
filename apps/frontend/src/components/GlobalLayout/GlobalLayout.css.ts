import { vars } from '@/styles/theme.css.ts';
import { globalStyle, style } from '@vanilla-extract/css';

globalStyle('html, body', { margin: 0 });

globalStyle('body', {
	fontFamily: 'DM Sans, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif',
	background: 'transparent',
	color: vars.color.text,
	transition: 'color .35s ease',
	minHeight: '100vh',
});

globalStyle('[data-theme="dark"] body', {
	background: 'transparent',
	color: vars.color.text,
});

// Optional smoothing
globalStyle('body', { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' });

globalStyle('*, *::before, *::after', {
	boxSizing: 'border-box',
});

export const globalBackground = style({
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100dvh',
	zIndex: -1,
	margin: 0,
	padding: 0,
	backgroundImage: `linear-gradient(to bottom, transparent, transparent), url('/mobile_backdrop.svg')`,
	backgroundSize: 'cover',
	backgroundPosition: 'top left',
	backgroundRepeat: 'no-repeat',
	'@media': {
		'(min-width: 768px)': {
			backgroundPosition: 'left 60%',
		},
		'(min-width: 1024px)': {
			backgroundImage: `linear-gradient(to bottom, transparent, transparent), url('/beach_backdrop.svg')`,
			backgroundPosition: 'top left',
		},
	},
});

globalStyle(`${globalBackground}::before`, {
	content: '""',
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	backgroundImage: `linear-gradient(to bottom, transparent, transparent), url('/mobile_night.svg')`,
	backgroundSize: 'cover',
	backgroundPosition: 'top left',
	backgroundRepeat: 'no-repeat',
	opacity: 0,
	transition: 'opacity 0.6s ease',
	'@media': {
		'(min-width: 768px)': {
			backgroundPosition: 'left 60%',
		},
		'(min-width: 1024px)': {
			backgroundImage: `linear-gradient(to bottom, transparent, transparent), url('/night-backdrop.svg')`,
			backgroundPosition: 'top left',
		},
	},
});

globalStyle(`[data-theme="dark"] ${globalBackground}::before`, {
	opacity: 1,
});

globalStyle(`${globalBackground}::after`, {
	content: '""',
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	// background: 'linear-gradient(to bottom, transparent, rgba(0, 153, 255, 0.85))',
	pointerEvents: 'none',
});
