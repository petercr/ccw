import { textContent } from '@/styles/shared/textContent.css.ts';
import { vars } from '@/styles/theme.css.ts';
import { style } from '@vanilla-extract/css';

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
});
