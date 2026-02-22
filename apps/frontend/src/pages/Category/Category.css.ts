import { vars } from '@/styles/theme.css.ts';
import { style } from '@vanilla-extract/css';

export const container = style({
	minHeight: '100vh',
	paddingTop: 60,
	paddingBottom: 72,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: 26,
	background: 'transparent',
});

export const headerPill = style({
	width: '90%',
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
	'@media': {
		'screen and (min-width: 768px)': {
			width: '50%',
			maxWidth: 600,
		},
	},
});

export const headerTitle = style({
	margin: 0,
	textAlign: 'center',
	color: '#000000',
	fontFamily: 'Roboto Slab, serif',
	fontWeight: 400,
	fontSize: 41,
	lineHeight: 1.2,
	selectors: {
		'[data-theme="dark"] &': {
			color: '#F5F9FC',
		},
	},
});

export const textContainer = style({
	width: '90%',
	borderRadius: 20,
	background: 'rgba(255, 255, 255, 0.89)',
	border: '1px solid #000000',
	boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
	paddingLeft: 18,
	paddingRight: 18,
	paddingTop: 18,
	paddingBottom: 24,
	display: 'flex',
	flexDirection: 'column',
	gap: 10,
	selectors: {
		'[data-theme="dark"] &': {
			background: vars.color.surfaceElevated,
			border: '2px solid rgba(210 201 201 / 0.63)',
			boxShadow: vars.shadow.subtle,
		},
	},
	'@media': {
		'screen and (min-width: 768px)': {
			width: '50%',
			maxWidth: 800,
		},
	},
});

export const ingress = style({
	width: '100%',
	fontSize: 18,
	fontWeight: 400,
	lineHeight: 1.2,
	color: '#000000',
	marginBottom: '0.5rem',
	marginTop: '0.5rem',
	fontFamily: 'Roboto Mono, monospace',
	wordBreak: 'break-word',
	overflowWrap: 'break-word',
	selectors: {
		'[data-theme="dark"] &': {
			color: '#ffffff',
		},
	},
});

export const keywordsSection = style({
	width: '100%',
	marginTop: '1rem',
	padding: '1rem',
	background: 'transparent',
	borderRadius: '0.75rem',
});

export const keywordsTitle = style({
	fontSize: 18,
	fontWeight: 400,
	color: '#000000',
	marginBottom: '0.75rem',
	marginTop: 0,
	fontFamily: 'Roboto Mono, monospace',
	selectors: {
		'[data-theme="dark"] &': {
			color: '#ffffff',
		},
	},
});

export const keywordsList = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '0.5rem',
	listStyle: 'none',
	padding: 0,
	margin: 0,
});

export const keywordItem = style({
	padding: '0.5rem 1rem',
	background: '#0099ff',
	border: 'none',
	borderRadius: '624px',
	color: '#000000',
	fontSize: '0.85rem',
	fontWeight: 400,
	fontFamily: 'Roboto Mono, monospace',
	transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
	cursor: 'default',
	selectors: {
		'&:hover': {
			background: '#00aaff',
			transform: 'translateY(-2px)',
		},
		'[data-theme="dark"] &': {
			background: '#0099ff',
			color: '#000000',
		},
	},
});
