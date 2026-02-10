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

export const header = style({
	width: '100%',
});

export const ingress = style({
	fontSize: 18,
	fontWeight: 400,
	lineHeight: 1.2,
	marginBottom: '0.5rem',
	marginTop: '0.5rem',
	color: '#000000',
	fontStyle: 'italic',
	fontFamily: 'Roboto Mono, monospace',
	selectors: {
		'[data-theme="dark"] &': {
			color: '#ffffff',
		},
	},
});

export const portableTextContainer = style({
	width: '100%',
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

export const authorAvatar = style({
	width: '44px',
	height: '44px',
	borderRadius: '50%',
	overflow: 'hidden',
	flexShrink: 0,
	background: vars.color.accentSoft,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '0.75rem',
	fontWeight: 600,
	letterSpacing: '.05em',
	color: vars.color.textDim,
	border: `1px solid ${vars.color.borderSoft}`,
});

export const authorAvatarImg = style({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	display: 'block',
});

export const metaBar = style({
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',
	gap: '0.5rem',
	fontSize: '0.8rem',
	letterSpacing: '0.03em',
	color: '#000000',
	marginTop: '0.5rem',
	marginBottom: '0.5rem',
	fontFamily: 'Roboto Mono, monospace',
	selectors: {
		'[data-theme="dark"] &': { color: '#C9D1D9' },
	},
});

export const metaItem = style({
	display: 'inline-flex',
	alignItems: 'center',
	gap: '0.25rem',
});

export const metaSeparator = style({
	opacity: 0.5,
});
