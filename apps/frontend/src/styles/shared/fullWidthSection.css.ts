import { style } from '@vanilla-extract/css';

export const fullWidthSection = style({
  gridColumn: '1 / -1',
  marginLeft: '-2.5rem',
  marginRight: '-2.5rem',
  minWidth: 0, // Fixes overflow issues in some browsers
  '@media': {
    'screen and (max-width: 768px)': {
      marginLeft: '-1.25rem',
      marginRight: '-1.25rem',
    },
  },
});
