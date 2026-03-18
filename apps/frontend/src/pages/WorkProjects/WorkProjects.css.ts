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
	background: 'transparent',
});

export const header = style({
	width: 300,
	borderRadius: 12,
	border: '1px solid #000000',
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
	background: 'rgba(255, 255, 255, 0.95)',
	border: '1px solid #000000',
	boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
	paddingLeft: 18,
	paddingRight: 18,
	paddingTop: 18,
	paddingBottom: 24,
	display: 'flex',
	flexDirection: 'column',
	gap: 10,
	'@media': {
		'screen and (min-width: 768px)': {
			width: 540,
		},
	},
	selectors: {
		'[data-theme="dark"] &': {
			background: vars.color.surfaceElevated,
			border: '2px solid rgba(210 201 201 / 0.63)',
			boxShadow: vars.shadow.subtle,
		},
	},
});

export const cardImage = style({
	borderRadius: 12,
	overflow: 'hidden',
	aspectRatio: '16 / 9',
	marginBottom: 8,
});

export const cardName = style({
	margin: '0.5em 0',
	paddingBottom: '0.5em',
	borderBottom: '1px solid #000000',
	color: '#000000',
	fontFamily: 'Roboto Mono, monospace',
	fontWeight: 400,
	fontSize: 24,
	lineHeight: 1.4,
	textAlign: 'left',
	'@media': {
		'screen and (min-width: 768px)': {
			borderBottom: 'none',
			paddingBottom: 0,
		},
	},
	selectors: {
		'[data-theme="dark"] &': {
			color: '#F5F9FC',
			borderBottomColor: 'rgba(210, 201, 201, 0.63)',
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

export const cardLink = style({
	display: 'inline-block',
	marginTop: 'auto',
	color: '#0000EE',
	fontSize: '1.2rem',
	fontWeight: 400,
	fontFamily: 'Roboto Mono, monospace',
	textDecoration: 'underline',
	transition: 'color 0.2s ease',
	selectors: {
		'&:hover': {
			color: '#0000AA',
		},
		'[data-theme="dark"] &': {
			color: vars.color.primary,
		},
		'[data-theme="dark"] &:hover': {
			color: '#F5F9FC',
		},
	},
});
