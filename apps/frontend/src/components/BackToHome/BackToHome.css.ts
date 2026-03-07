import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.ts';

export const card = style({
	width: 321,
	borderRadius: 20,
	background: '#ffffff',
	border: '2px solid #000000',
	boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
	paddingTop: 16,
	paddingBottom: 16,
	paddingLeft: 18,
	paddingRight: 18,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: 12,
	selectors: {
		'[data-theme="dark"] &': {
			background: vars.color.surfaceElevated,
			border: '2px solid rgba(210 201 201 / 0.63)',
			boxShadow: vars.shadow.subtle,
		},
	},
});

export const cardTitle = style({
	margin: 0,
	color: '#000000',
	fontFamily: 'Roboto Mono, monospace',
	fontWeight: 400,
	fontSize: 18,
	selectors: {
		'[data-theme="dark"] &': {
			color: '#F5F9FC',
		},
	},
});

export const button = style({
	width: 147,
	height: 56,
	borderRadius: 20,
	background: '#86d0f5',
	border: '1px solid #000000',
	color: '#000000',
	fontFamily: 'Roboto Mono, monospace',
	fontWeight: 400,
	fontSize: 18,
	cursor: 'pointer',
	textDecoration: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition: 'background 0.2s ease',
	selectors: {
		'&:hover': {
			background: '#0088dd',
		},
		'[data-theme="dark"] &': {
			background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 35%, transparent), #230939;',
			borderColor: '#ffffff',
			color: '#ffffff',
		},
	},
});
