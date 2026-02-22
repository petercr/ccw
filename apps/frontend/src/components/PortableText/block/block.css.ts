import { globalStyle, style } from '@vanilla-extract/css';
import { textContent } from '@/styles/shared/textContent.css.ts';
import { vars } from '@/styles/theme.css.ts';

export const h2 = style([
	textContent,
	{
		fontSize: '2rem',
		marginTop: '3.5rem',
		marginBottom: '1.25rem',
		color: vars.color.text,
	},
]);

export const h3 = style([
	textContent,
	{
		fontSize: '1.6rem',
		marginTop: '3rem',
		marginBottom: '1.1rem',
		color: vars.color.text,
	},
]);

export const h4 = style([
	textContent,
	{
		fontSize: '1.35rem',
		marginTop: '2.5rem',
		marginBottom: '.9rem',
		fontWeight: 500,
		color: vars.color.text,
	},
]);

export const pre = style([
	textContent,
	{
		background: vars.color.surfaceElevated,
		border: `1px solid ${vars.color.borderSoft}`,
		borderRadius: '1.25rem',
		padding: '2rem',
		marginTop: '2.5rem',
		marginBottom: '2.5rem',
	},
]);

export const p = style([
	textContent,
	{
		lineHeight: 1.7,
		fontSize: '1.05rem',
		marginBottom: '1.6rem',
		color: vars.color.textDim,
		wordBreak: 'break-word',
		overflowWrap: 'break-word',
	},
]);
globalStyle(`${p} a`, {
	color: vars.color.primaryAlt,
});

export const blockquote = style({
	gridColumn: '3 / -2',
	borderLeft: `3px solid ${vars.color.primaryAlt}55`,
	paddingLeft: '1.5rem',
	marginTop: '3rem',
	marginBottom: '2.75rem',
	fontSize: '1.2rem',
	lineHeight: 1.6,
	color: vars.color.textDim,
	'@media': {
		'screen and (max-width: 768px)': {
			gridColumn: '1 / -1',
		},
	},
});
