import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css.ts';

export const container = style({
	gridColumn: '1 / -1',
	minWidth: 0,
	margin: '2rem 0 3rem',
	padding: '1rem 0 0.5rem',
	borderRadius: vars.radius.md,
	background: vars.color.bgAlt,
	color: vars.color.text,
	overflow: 'hidden',
});

export const track = style({
	vars: { '--visible-count': '1' },
	display: 'flex',
	gap: '1rem',
	overflowX: 'auto',
	overscrollBehaviorInline: 'contain',
	scrollSnapType: 'x mandatory',
	scrollBehavior: 'smooth',
	scrollbarWidth: 'thin',
	scrollbarColor: `${vars.color.primary} transparent`,
	padding: '0.25rem 1.25rem 0.75rem',
	'@media': {
		'screen and (min-width: 768px)': {
			vars: { '--visible-count': 'min(var(--requested-count), 2)' },
			paddingInline: '2.5rem',
		},
		'screen and (min-width: 1200px)': {
			vars: { '--visible-count': 'var(--requested-count)' },
		},
		'(prefers-reduced-motion: reduce)': {
			scrollBehavior: 'auto',
		},
	},
	selectors: {
		'&:focus-visible': {
			outline: `3px solid ${vars.color.primary}`,
			outlineOffset: '-3px',
		},
	},
});

export const figure = style({
	flex: '0 0 calc((100% - (var(--visible-count) - 1) * 1rem) / var(--visible-count))',
	minWidth: 0,
	margin: 0,
	scrollSnapAlign: 'start',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

export const image = style({
	display: 'block',
	width: '100%',
	height: 'auto',
	maxHeight: '50vh',
	objectFit: 'contain',
	margin: '0!important',
});

export const figcaption = style({
	marginTop: '0.5rem',
	fontSize: '0.875rem',
	textAlign: 'center',
	color: vars.color.text,
});

export const captionText = style({
	marginBottom: '0.5rem',
	fontWeight: 500,
});

export const credits = style({
	marginTop: '0.75rem',
	fontSize: '0.75rem',
	fontStyle: 'italic',
	color: vars.color.textDim,
});

export const controls = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '0.75rem',
	marginTop: '0.75rem',
});

export const navButton = style({
	display: 'grid',
	placeItems: 'center',
	width: '2.5rem',
	height: '2.5rem',
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radius.pill,
	background: vars.color.bgAlt,
	color: vars.color.text,
	cursor: 'pointer',
	fontSize: '1.25rem',
	selectors: {
		'&:hover:not(:disabled)': { background: vars.color.surfaceHover },
		'&:disabled': { opacity: 0.4, cursor: 'default' },
		'&:focus-visible': { outline: `3px solid ${vars.color.primary}`, outlineOffset: '3px' },
	},
});

export const indicators = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexWrap: 'wrap',
	gap: '0.25rem',
});

export const indicator = style({
	width: '1.5rem',
	height: '1.5rem',
	padding: '0.5rem',
	border: 0,
	borderRadius: vars.radius.pill,
	background: 'transparent',
	cursor: 'pointer',
	selectors: {
		'&::before': {
			content: '""',
			display: 'block',
			width: '0.5rem',
			height: '0.5rem',
			borderRadius: vars.radius.pill,
			background: vars.color.textDim,
			opacity: 0.55,
		},
		'&[aria-current="true"]::before': { background: vars.color.primary, opacity: 1 },
		'&:focus-visible': { outline: `3px solid ${vars.color.primary}`, outlineOffset: '2px' },
	},
});
