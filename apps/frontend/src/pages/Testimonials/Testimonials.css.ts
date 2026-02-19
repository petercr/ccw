import { vars } from '@/styles/theme.css.ts';
import { style } from '@vanilla-extract/css';

export const container = style({
	minHeight: '100vh',
	paddingTop: 60,
	paddingBottom: 72,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: 54,
});

export const headerPill = style({
	width: 300,
	borderRadius: 12,
	background: '#ffffff',
	boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
	paddingTop: 16,
	paddingBottom: 16,
	paddingLeft: 16,
	paddingRight: 16,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	selectors: {
		'[data-theme="dark"] &': {
			background: vars.color.surfaceElevated,
			border: '2px solid rgba(210 201 201 / 0.63)',
			boxShadow: vars.shadow.subtle,
		},
	},
});

export const headerTitle = style({
	margin: 0,
	textAlign: 'center',
	color: '#000000',
	fontFamily: 'Roboto Slab, serif',
	fontWeight: 400,
	fontSize: 'clamp(2rem, 6vw, 3rem)',
	lineHeight: 1.2,
	selectors: {
		'[data-theme="dark"] &': {
			color: '#F5F9FC',
		},
	},
});

export const cardGrid = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: 26,
	width: '100%',
});

export const card = style({
	width: 323,
	borderRadius: 20,
	background: 'rgba(255, 255, 255, 0.81)',
	border: '1px solid #000000',
	boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
	paddingTop: 150,
	paddingLeft: 18,
	paddingRight: 18,
	paddingBottom: 24,
	display: 'flex',
	flexDirection: 'column',
	gap: 10,
	position: 'relative',
	selectors: {
		'[data-theme="dark"] &': {
			background: vars.color.surfaceElevated,
			border: '2px solid rgba(210 201 201 / 0.63)',
			boxShadow: vars.shadow.subtle,
		},
	},
});

export const avatarBg = style({
	width: 120,
	height: 120,
	borderRadius: '50%',
	position: 'absolute',
	top: 23,
	left: '50%',
	transform: 'translateX(-50%)',
	display: 'grid',
	placeItems: 'center',
});

export const avatarImage = style({
	width: 120,
	height: 120,
	borderRadius: '50%',
	objectFit: 'cover',
	background: 'transparent',
});

export const cardName = style({
	margin: '0.5em 0',
	color: '#000000',
	fontFamily: 'Roboto Mono, monospace',
	fontWeight: 400,
	fontSize: 24,
	lineHeight: 1.4,
	textAlign: 'left',
	selectors: {
		'[data-theme="dark"] &': {
			color: '#F5F9FC',
		},
	},
});

export const cardBody = style({
	margin: 0,
	color: '#000000',
	fontFamily: 'Roboto Mono, monospace',
	fontWeight: 400,
	fontSize: 18,
	lineHeight: 1.2,
	selectors: {
		'[data-theme="dark"] &': {
			color: '#ffffff',
		},
	},
});
