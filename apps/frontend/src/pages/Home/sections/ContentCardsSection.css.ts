import { vars } from '@/styles/theme.css.ts';
import { style } from '@vanilla-extract/css';

export const contentCardsSection = style({
	paddingTop: '4rem',
	paddingBottom: '4rem',
	paddingLeft: '2rem',
	paddingRight: '2rem',
	maxWidth: '80rem',
	marginLeft: 'auto',
	marginRight: 'auto',
	display: 'flex',
	flexDirection: 'column',
	gap: '4rem',
	'@media': {
		'screen and (max-width: 768px)': {
			paddingLeft: '1.5rem',
			paddingRight: '1.5rem',
			gap: '3rem',
		},
	},
});

export const cardRow = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(1, 1fr)',
	gap: '2.5rem',
});

export const cardPair = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',
});

export const headingCard = style({
	textAlign: 'center',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '2rem',
	background: vars.color.surfaceElevated,
	border: `2px solid ${vars.color.borderSoft}`,
	borderRadius: '1.25rem',
	boxShadow: vars.shadow.subtle,
});

export const headingText = style({
	fontSize: '1.5rem',
	fontWeight: 600,
	color: vars.color.primary,
	letterSpacing: '-0.02em',
	lineHeight: 1.2,
});

export const contentCard = style({
	background: vars.color.bg,
	border: `2px solid ${vars.color.borderSoft}`,
	borderRadius: '1.5rem',
	padding: '2.5rem',
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',
	boxShadow: vars.shadow.subtle,
	transition: 'transform 0.3s ease, box-shadow 0.3s ease',
	':hover': {
		transform: 'translateY(-4px)',
		boxShadow: vars.shadow.float,
		borderColor: vars.color.border,
	},
});

export const cardText = style({
	fontSize: '1.125rem',
	lineHeight: 1.6,
	color: vars.color.text,
});

export const linkList = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',
	marginTop: 'auto',
});

export const simpleLink = style({
	color: vars.color.primary,
	textDecoration: 'none',
	fontWeight: 500,
	fontSize: '0.95rem',
	transition: 'color 0.2s ease',
	':hover': {
		color: vars.color.primaryAlt,
		textDecoration: 'underline',
	},
});

export const buttonLink = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '0.75rem 1.5rem',
	borderRadius: '0.75rem',
	background: vars.color.primary,
	color: '#fff',
	textDecoration: 'none',
	fontWeight: 600,
	fontSize: '0.95rem',
	transition: 'background 0.2s ease, transform 0.2s ease',
	':hover': {
		background: vars.color.primaryAlt,
		transform: 'scale(1.02)',
	},
	':active': {
		transform: 'scale(0.98)',
	},
});
