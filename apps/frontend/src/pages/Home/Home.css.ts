import { vars } from '@/styles/theme.css.ts';
import { style } from '@vanilla-extract/css';

export const homeContainer = style({
	minHeight: '100vh',
	background: 'transparent',
});

export const heroSection = style({

	paddingTop: '7.5rem',
	paddingBottom: '8.5rem',
	paddingLeft: '2rem',
	paddingRight: '2rem',
	maxWidth: '72rem',
	marginLeft: 'auto',
	marginRight: 'auto',
	textAlign: 'center',
	'@media': {
		'screen and (max-width: 768px)': {
			paddingTop: '7rem',
			paddingBottom: '9rem',
			paddingLeft: '1.5rem',
			paddingRight: '1.5rem',
		},
	},
});

export const heroContent = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '1.5rem',
	background: '#F5F5F0',
	border: '2px solid rgba(0, 0, 0, 0.9)',
	borderRadius: '1.25rem',
	padding: '2.5rem 2rem',
	boxShadow: vars.shadow.subtle,
	selectors: {
		'[data-theme="dark"] &': {
			background: '#0a1628',
			border: '2px solid rgba(210 201 201 / 0.63)',
			boxShadow: vars.shadow.subtle,
		},
	},
});

export const heroTitle = style({
	color: '#1a1a1a',
	fontSize: '3rem',
	fontWeight: 700,
	letterSpacing: '-0.02em',
	marginBottom: '0.5rem',
	lineHeight: 1.1,
	'@media': {
		'screen and (max-width: 768px)': {
			fontSize: '2.5rem',
			letterSpacing: '-0.02em',
		},
	},
	selectors: {
		'[data-theme="dark"] &': {
			color: '#F5F9FC',
		},
	},
});

export const heroSubtitle = style({
	fontSize: '1.25rem',
	fontWeight: 400,
	fontStyle: 'italic',
	color: '#4a4a4a',
	marginBottom: '0.5rem',
	letterSpacing: '-0.01em',
	lineHeight: 1.5,
	textAlign: 'center',
	'@media': {
		'screen and (max-width: 768px)': {
			fontSize: '1.125rem',
		},
	},
	selectors: {
		'[data-theme="dark"] &': {
			color: '#ffffff',
		},
	},
});

export const heroDescription = style({
	fontSize: '1.3125rem',
	lineHeight: 1.9,
	color: vars.color.textDim,
	maxWidth: '46rem',
	marginBottom: '2rem',
	letterSpacing: '-0.008em',
	fontWeight: 300,
	'@media': {
		'screen and (max-width: 768px)': {
			fontSize: '1.125rem',
		},
	},
});

export const logoContainer = style({
	display: 'flex',
	alignItems: 'center',
	gap: '3rem',
	marginTop: '3rem',
	marginBottom: '5rem',
	'@media': {
		'screen and (max-width: 768px)': {
			gap: '2rem',
			flexWrap: 'wrap',
			justifyContent: 'center',
		},
	},
});

export const logosRow = style({
	display: 'flex',
	alignItems: 'center',
	gap: '3rem',
	'@media': {
		'screen and (max-width: 640px)': {
			flexDirection: 'column',
			gap: '1.25rem',
		},
	},
});

export const logo = style({
	height: '40px',
	opacity: 0.85,
	transition: 'opacity 0.3s ease',
	':hover': {
		opacity: 1,
	},
	'@media': {
		'screen and (max-width: 768px)': {
			height: '36px',
		},
	},
});

export const logoSeparator = style({
	fontSize: '2.5rem',
	fontWeight: 100,
	lineHeight: 1,
	color: 'rgba(0,0,0,0.25)',
	selectors: {
		'[data-theme="dark"] &': { color: 'rgba(255,255,255,0.4)' },
	},
	'@media': {
		'screen and (max-width: 640px)': { fontSize: '1.75rem' },
	},
});

export const featureGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: '2.5rem',
	width: '100%',
	maxWidth: '64rem',
	marginTop: '5rem',
	'@media': {
		'screen and (max-width: 768px)': {
			gridTemplateColumns: '1fr',
			gap: '2rem',
			marginTop: '3.5rem',
		},
	},
});

export const featureCard = style({
	background: vars.color.surfaceElevated,
	border: `2px solid ${vars.color.borderSoft}`,
	borderRadius: '1.25rem',
	padding: '2.1rem',
	textAlign: 'center',
	boxShadow: vars.shadow.subtle,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '0.75rem',
	position: 'relative',
	transition: 'background .25s, border-color .25s, box-shadow .35s, transform .35s cubic-bezier(0.4,0,0.2,1)',
	selectors: {
		'&:hover': {
			background: vars.color.surfaceHover,
			borderColor: vars.color.border,
			boxShadow: vars.shadow.float,
			transform: 'translateY(-4px)',
		},
		'&:focus-within': {
			outline: 'none',
			boxShadow: `${vars.shadow.float}, 0 0 0 3px ${vars.color.accentTint}`,
		},
	},
	'@media': {
		'screen and (max-width: 768px)': {
			padding: '1.6rem',
		},
	},
});

export const featureIcon = style({
	fontSize: '2.5rem',
	marginBottom: '0.9rem',
	lineHeight: 1,
	color: vars.color.primary,
	transition: 'color .25s',
	selectors: {
		[`${featureCard}:hover &`]: { color: vars.color.primaryAlt },
	},
	'@media': {
		'screen and (max-width: 768px)': {
			fontSize: '2.25rem',
			marginBottom: '0.8rem',
		},
	},
});

export const featureTitle = style({
	fontSize: 'clamp(1.05rem, 0.9rem + 0.5vw, 1.25rem)',
	fontWeight: 600,
	color: vars.color.text,
	marginBottom: '0.45rem',
	letterSpacing: '-0.01em',
});

export const featureDescription = style({
	fontSize: 'clamp(0.85rem, 0.8rem + 0.3vw, 0.95rem)',
	color: vars.color.textDim,
	lineHeight: 1.55,
	letterSpacing: '-0.005em',
	fontWeight: 300,
	maxWidth: '38ch',
});

export const divider = style({
	height: '1px',
	background: 'linear-gradient(90deg, transparent 0%, rgba(0, 102, 204, 0.08) 50%, transparent 100%)',
	marginTop: '5rem',
	marginBottom: '4rem',
	maxWidth: '80rem',
	marginLeft: 'auto',
	marginRight: 'auto',
	selectors: {
		'[data-theme="dark"] &': {
			background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
		},
	},
	'@media': {
		'screen and (max-width: 768px)': {
			marginTop: '6rem',
			marginBottom: '4rem',
		},
	},
});

export const section = style({
	paddingTop: '3.75rem',
	paddingBottom: '3.75rem',
	paddingLeft: '2rem',
	paddingRight: '2rem',
	maxWidth: '80rem',
	marginLeft: 'auto',
	marginRight: 'auto',
	'@media': {
		'screen and (max-width: 768px)': {
			paddingTop: '4rem',
			paddingBottom: '4rem',
			paddingLeft: '1.5rem',
			paddingRight: '1.5rem',
		},
	},
});

export const sectionTitle = style({
	color: vars.color.primary,
	fontSize: '2.75rem',
	fontWeight: 600,
	marginBottom: '2.5rem',
	textAlign: 'center',
	letterSpacing: '-0.025em',
	'@media': {
		'screen and (max-width: 768px)': {
			fontSize: '2.125rem',
			marginBottom: '3rem',
		},
	},
	selectors: {
		'[data-theme="dark"] &': { color: '#F5F9FC' },
	},
});

export const container = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
	gap: '2rem',
	'@media': {
		'screen and (min-width: 768px)': { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '2.5rem' },
		'screen and (min-width: 1024px)': { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '3rem' },
	},
});

export const loadMoreButton = style({
	marginTop: '3rem',
	padding: '1.125rem 3rem',
	fontSize: '1.0625rem',
	fontWeight: 500,
	color: vars.color.text,
	background: vars.color.accentSoft,
	backdropFilter: 'blur(10px)',
	border: `1.5px solid ${vars.color.borderSoft}`,
	borderRadius: '624px',
	cursor: 'pointer',
	transition: 'background .25s, border-color .25s, box-shadow .25s, transform .25s',
	':hover': {
		background: vars.color.accentTint,
		borderColor: vars.color.border,
		transform: 'translateY(-2px)',
		boxShadow: vars.shadow.float,
	},
	':focus-visible': { outline: 'none', boxShadow: vars.shadow.focus },
	':active': { transform: 'translateY(0)', boxShadow: vars.shadow.subtle },
	gridColumn: '1 / -1',
	justifySelf: 'center',
});

// New sections
export const subtleHeading = style({
	fontSize: '0.75rem',
	textTransform: 'uppercase',
	letterSpacing: '0.15em',
	fontWeight: 600,
	color: vars.color.textDim,
	marginBottom: '1.25rem',
});

export const highlightsGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))',
	gap: '1.5rem',
	width: '100%',
	marginTop: '1rem',
});

export const highlightCard = style({
	background: vars.color.surfaceElevated,
	border: `1px solid ${vars.color.borderSoft}`,
	borderRadius: '1rem',
	padding: '1.25rem 1.35rem 1.3rem',
	display: 'flex',
	flexDirection: 'column',
	gap: '.5rem',
	position: 'relative',
	overflow: 'hidden',
	backdropFilter: 'blur(12px)',
	transition: 'background .25s, border-color .25s',
	selectors: { '&:hover': { background: vars.color.surfaceHover, borderColor: vars.color.border } },
});

export const highlightIcon = style({
	fontSize: '1.35rem',
	lineHeight: 1,
});

export const highlightTitle = style({
	fontSize: '0.95rem',
	fontWeight: 600,
	letterSpacing: '-0.01em',
	position: 'relative',
	color: vars.color.text, // bedre kontrast i begge tema
	paddingBottom: '.35rem',
	selectors: {
		'&::after': {
			content: '""',
			position: 'absolute',
			left: 0,
			bottom: 0,
			height: '2px',
			width: '28px',
			borderRadius: '2px',
			background: `linear-gradient(90deg, ${vars.color.primary}, ${vars.color.primaryAlt})`,
			opacity: 0.85,
			transition: 'opacity .25s',
		},
		'&:hover::after': { opacity: 1 },
		'[data-theme="dark"] &': { color: '#F5F9FC' },
		'[data-theme="dark"] &:hover': { color: vars.color.primary },
	},
	transition: 'color .25s',
	':hover': { color: vars.color.primary },
});

export const highlightText = style({
	fontSize: '0.8rem',
	lineHeight: 1.5,
	color: vars.color.textDim,
});

export const wideSection = style({
	maxWidth: '80rem',
	margin: '0 auto',
	padding: '0 2rem',
	'@media': { 'screen and (max-width: 768px)': { padding: '0 1.5rem' } },
});

export const twoCol = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
	gap: '2.25rem',
	alignItems: 'start',
});

export const paragraph = style({
	fontSize: '1rem',
	lineHeight: 1.7,
	color: vars.color.text,
	letterSpacing: '-0.005em',
});

export const callout = style({
	background: `linear-gradient(135deg, ${vars.color.bgAlt} 0%, ${vars.color.bgSoft} 70%)`,
	border: `1px solid ${vars.color.borderSoft}`,
	borderRadius: '1rem',
	padding: '1.5rem 1.75rem',
	display: 'flex',
	flexDirection: 'column',
	gap: '0.85rem',
	position: 'relative',
	transition: 'background .3s, border-color .3s, box-shadow .3s',
	selectors: {
		'[data-theme="dark"] &': {
			background: `linear-gradient(135deg, ${vars.color.bgAlt} 0%, ${vars.color.surfaceElevated} 60%)`,
			boxShadow: '0 4px 14px rgba(0,0,0,0.55)',
			borderColor: vars.color.border,
		},
		'&:hover': {
			background: vars.color.surfaceHover,
			borderColor: vars.color.border,
			boxShadow: vars.shadow.float,
		},
	},
});

export const devExpList = style({
	margin: 0,
	padding: '0 0 0 1.1rem',
	fontSize: '0.85rem',
	lineHeight: 1.6,
	color: 'rgba(0,0,0,0.7)',
	selectors: {
		'[data-theme="dark"] &': { color: vars.color.textDim },
	},
});

export const codeBlock = style({
	fontFamily: vars.font.mono,
	fontSize: '0.8rem',
	lineHeight: 1.6,
	background: vars.color.codeBg,
	border: `1px solid ${vars.color.borderSoft}`,
	padding: '1rem 1.25rem',
	borderRadius: '0.75rem',
	overflowX: 'auto',
	transition: 'background .3s, border-color .3s',
	color: vars.color.text,
	selectors: {
		'[data-theme="dark"] &': {
			background: vars.color.surfaceElevated,
			borderColor: vars.color.borderSoft,
			color: vars.color.text,
			boxShadow: 'inset 0 0 0 999px rgba(0,0,0,0.02)',
		},
	},
});

export const miniBadgeRow = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '.5rem',
	marginTop: '1rem',
});

export const miniBadge = style({
	fontSize: '0.65rem',
	padding: '.4rem .7rem',
	borderRadius: '624px',
	background: vars.color.accentTint,
	color: vars.color.primaryDeep,
	fontWeight: 500,
	letterSpacing: '.06em',
	lineHeight: 1,
	whiteSpace: 'nowrap',
	transition: 'background .25s,color .25s',
	selectors: {
		'&:hover': { background: vars.color.accentSoft, color: vars.color.primary },
		'[data-theme="dark"] &': {
			background: vars.color.surfaceElevated,
			color: '#F5F9FC',
			border: `1px solid ${vars.color.borderSoft}`,
		},
		'[data-theme="dark"] &:hover': { background: vars.color.surfaceHover, color: vars.color.primary },
	},
});
