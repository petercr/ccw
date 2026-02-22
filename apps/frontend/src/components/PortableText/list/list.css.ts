import { globalStyle, style } from '@vanilla-extract/css';
import { textContent } from '@/styles/shared/textContent.css.ts';
import { vars } from '@/styles/theme.css.ts';

export const ul = style([
	textContent,
	{
		color: vars.color.textDim,
		lineHeight: 1.6,
		fontSize: '1.05rem',
		marginBottom: '2rem',
		marginTop: '1.5rem',
		paddingLeft: '1.75rem',
		listStyle: 'initial',
	},
]);

export const ol = style([
	textContent,
	{
		color: vars.color.textDim,
		lineHeight: 1.6,
		fontSize: '1.05rem',
		marginBottom: '2rem',
		marginTop: '1.5rem',
		paddingLeft: '1.75rem',
		listStyle: 'initial',
	},
]);

export const li = style({
	marginBottom: '.65rem',
	wordBreak: 'break-word',
	overflowWrap: 'break-word',
});

globalStyle(`${li} a`, {
	color: vars.color.primaryAlt,
});
