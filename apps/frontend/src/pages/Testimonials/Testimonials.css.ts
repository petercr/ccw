import { vars } from '@/styles/theme.css.ts';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  minHeight: '100vh',
  gridAutoRows: 'auto',
  background: `linear-gradient(180deg, ${vars.color.bg} 0%, ${vars.color.bgAlt} 50%, ${vars.color.bgSoft} 100%)`,
  paddingTop: '3rem',
  paddingBottom: '7rem',
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
      paddingTop: '2rem',
    },
  },
});

export const header = style({
  gridColumn: '3 / 11',
  gridRow: 1,
  marginBottom: '2rem',
  '@media': {
    'screen and (max-width: 768px)': {
      gridColumn: '1 / -1',
      marginBottom: '1.5rem',
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
    },
  },
});

export const cardGrid = style({
  gridColumn: '3 / 11',
  gridRow: 2,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '2rem',
  '@media': {
    'screen and (max-width: 768px)': {
      gridColumn: '1 / -1',
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
    },
  },
});

export const card = style({
  background: vars.color.glass,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${vars.color.borderSoft}`,
  borderRadius: '1.5rem',
  padding: '1.5rem',
  boxShadow: vars.shadow.subtle,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const cardImage = style({
  borderRadius: '50%',
  overflow: 'hidden',
  width: '100px',
  height: '100px',
  margin: '0 auto',
  flexShrink: 0,
});

export const cardImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const cardName = style({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: vars.color.primary,
  margin: 0,
  textAlign: 'center',
});

export const cardBody = style({
  fontSize: '1rem',
  lineHeight: 1.7,
  color: vars.color.textDim,
  margin: 0,
  fontStyle: 'italic',
});
