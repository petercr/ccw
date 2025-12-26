import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.ts';

export const figure = style([
  {
    gridColumn: '5 / -4',
    '@media': {
      'screen and (max-width: 1900px)': {
        gridColumn: '4 / -3',
      },
      'screen and (max-width: 1280px)': {
        gridColumn: '3 / -2',
      },
      'screen and (max-width: 768px)': {
        gridColumn: '1 / -1',
      },
    },
  },
  {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    margin: 0,
  },
]);

export const image = style({
  margin: 0,
  gridColumn: '1 / -2',
  '@media': {
    'screen and (max-width: 768px)': {
      gridColumn: '1 / -1',
    },
  },
});

export const figcaption = style({
  color: vars.color.textDim,
  gridColumn: '-2 / -1',
  paddingLeft: '0.5rem',
  alignContent: 'end',
  textAlign: 'left',
  '@media': {
    'screen and (max-width: 768px)': {
      gridColumn: '1 / -1',
      paddingLeft: 0,
    },
  },
});

export const caption = style({
  fontWeight: 500,
  fontSize: '0.875rem',
  color: vars.color.text,
});

export const credits = style({
  fontSize: '0.75rem',
  fontStyle: 'italic',
  color: vars.color.textDim,
});
