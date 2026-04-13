import { style } from '@vanilla-extract/css';

export const shaderContainer = style({
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100dvh',
	zIndex: 0,
	pointerEvents: 'none',
	opacity: 0,
	transition: 'opacity 0.8s ease',
});

export const shaderVisible = style({
	opacity: 1,
});
