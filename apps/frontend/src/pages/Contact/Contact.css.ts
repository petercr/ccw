import { vars } from '@/styles/theme.css.ts';
import { style } from '@vanilla-extract/css';

export const container = style({
	minHeight: '100vh',
	paddingTop: 60,
	paddingBottom: 72,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: 32,
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

export const formCard = style({
	width: 323,
	borderRadius: 20,
	background: 'rgba(255, 255, 255, 0.92)',
	border: '2px solid #000000',
	boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
	paddingTop: 24,
	paddingBottom: 32,
	paddingLeft: 18,
	paddingRight: 18,
	display: 'flex',
	flexDirection: 'column',
	gap: 20,
	selectors: {
		'[data-theme="dark"] &': {
			background: vars.color.surfaceElevated,
			border: '2px solid rgba(210 201 201 / 0.63)',
			boxShadow: vars.shadow.subtle,
		},
	},
});

export const formTitle = style({
	margin: 0,
	color: '#000000',
	fontFamily: 'Roboto Mono, monospace',
	fontWeight: 400,
	fontSize: 24,
	lineHeight: 1.2,
	paddingBottom: 12,
	borderBottom: '2px solid #000000',
	selectors: {
		'[data-theme="dark"] &': {
			color: '#F5F9FC',
			borderBottomColor: 'rgba(210 201 201 / 0.63)',
		},
	},
});

export const fieldGroup = style({
	display: 'flex',
	flexDirection: 'column',
	gap: 6,
});

export const fieldLabel = style({
	color: '#000000',
	fontFamily: 'Roboto Mono, monospace',
	fontWeight: 400,
	fontSize: 18,
	lineHeight: 1.2,
	selectors: {
		'[data-theme="dark"] &': {
			color: '#F5F9FC',
		},
	},
});

export const fieldInput = style({
	width: '100%',
	height: 43,
	borderRadius: 10,
	background: '#1029b5',
	border: 'none',
	outline: 'none',
	paddingLeft: 12,
	paddingRight: 12,
	color: '#ffffff',
	fontFamily: 'Roboto Mono, monospace',
	fontWeight: 400,
	fontSize: 18,
	boxSizing: 'border-box',
	selectors: {
		'&::placeholder': {
			color: 'rgba(255, 255, 255, 0.5)',
		},
		'&:focus': {
			boxShadow: '0 0 0 2px rgba(0, 153, 255, 0.6)',
		},
	},
});

export const fieldTextarea = style({
	width: '100%',
	minHeight: 160,
	borderRadius: 10,
	background: '#1029b5',
	border: 'none',
	outline: 'none',
	paddingTop: 10,
	paddingBottom: 10,
	paddingLeft: 12,
	paddingRight: 12,
	color: '#ffffff',
	fontFamily: 'Roboto Mono, monospace',
	fontWeight: 400,
	fontSize: 18,
	resize: 'vertical',
	boxSizing: 'border-box',
	selectors: {
		'&::placeholder': {
			color: 'rgba(255, 255, 255, 0.5)',
		},
		'&:focus': {
			boxShadow: '0 0 0 2px rgba(0, 153, 255, 0.6)',
		},
	},
});

export const fieldError = style({
	color: '#d92f2f',
	fontFamily: 'Roboto Mono, monospace',
	fontSize: 13,
	marginTop: 2,
	selectors: {
		'[data-theme="dark"] &': {
			color: '#FF5F5F',
		},
	},
});

export const submitButton = style({
	alignSelf: 'center',
	width: 144,
	height: 49,
	borderRadius: 10,
	background: '#0099ff',
	border: '1px solid #000000',
	color: '#ffffff',
	fontFamily: 'Roboto Mono, monospace',
	fontWeight: 400,
	fontSize: 18,
	cursor: 'pointer',
	transition: 'background 0.2s ease, transform 0.1s ease',
	selectors: {
		'&:hover': {
			background: '#0088dd',
			transform: 'translateY(-1px)',
		},
		'&:active': {
			transform: 'translateY(0)',
		},
		'&:disabled': {
			opacity: 0.6,
			cursor: 'not-allowed',
			transform: 'none',
		},
	},
});

export const successMessage = style({
	textAlign: 'center',
	color: '#178544',
	fontFamily: 'Roboto Mono, monospace',
	fontWeight: 400,
	fontSize: 18,
	padding: '16px 0',
	selectors: {
		'[data-theme="dark"] &': {
			color: '#2FB573',
		},
	},
});

export const errorMessage = style({
	textAlign: 'center',
	color: '#d92f2f',
	fontFamily: 'Roboto Mono, monospace',
	fontWeight: 400,
	fontSize: 14,
	selectors: {
		'[data-theme="dark"] &': {
			color: '#FF5F5F',
		},
	},
});

export const socialCard = style({
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

export const socialTitle = style({
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

export const socialIcons = style({
	display: 'flex',
	flexDirection: 'row',
	gap: 16,
	alignItems: 'center',
});

export const socialLink = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: 46,
	height: 46,
	borderRadius: 8,
	color: 'inherit',
	transition: 'opacity 0.2s ease',
	selectors: {
		'&:hover': {
			opacity: 0.8,
		},
	},
});

export const backHomeCard = style({
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

export const backHomeTitle = style({
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

export const backHomeButton = style({
	width: 147,
	height: 56,
	borderRadius: 20,
	background: '#0099ff',
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
	},
});
