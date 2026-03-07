import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.ts';

export const card = style({
	width: 323,
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

export const title = style({
	margin: 0,
	color: '#000000',
	fontFamily: 'Roboto Mono, monospace',
	fontWeight: 400,
	fontSize: 20,
	selectors: {
		'[data-theme="dark"] &': {
			color: '#F5F9FC',
		},
	},
});

export const icons = style({
	display: 'flex',
	flexDirection: 'row',
	gap: 16,
	alignItems: 'center',
});

export const link = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: 46,
	height: 46,
	borderRadius: 8,
	color: '#000000',
	transition: 'opacity 0.2s ease',
	selectors: {
		'&:hover': {
			opacity: 0.7,
		},
		'[data-theme="dark"] &': {
			color: '#F5F9FC',
		},
	},
});
