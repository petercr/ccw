import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.ts';

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
    },
  },
});

export const textContainer = style({
  gridColumn: '3 / 11',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  gridRow: 2,
  '@media': {
    'screen and (max-width: 768px)': {
      gridColumn: '1 / -1',
    },
  },
});

export const ingress = style({
  gridColumn: '1 / -1',
  maxWidth: '42rem',
  fontSize: '1.5rem',
  fontWeight: 300,
  lineHeight: 1.9,
  color: vars.color.textDim,
  marginBottom: '3.5rem',
  marginTop: '1.5rem',
  letterSpacing: '-0.01em',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '1.25rem',
      marginBottom: '2.5rem',
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
    },
  },
});

export const keywordsSection = style({
  gridColumn: '1 / -1',
  marginTop: '3.5rem',
  padding: '2.5rem',
  background: vars.color.glass,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${vars.color.borderSoft}`,
  borderRadius: '1.5rem',
  boxShadow: vars.shadow.subtle,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '1.75rem',
      marginLeft: '1.25rem',
      marginRight: '1.25rem',
    },
  },
});

export const keywordsTitle = style({
  fontSize: '1.375rem',
  fontWeight: 600,
  color: vars.color.primary,
  marginBottom: '2rem',
  marginTop: 0,
  letterSpacing: '-0.015em',
});

export const keywordsList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const keywordItem = style({
  padding: '0.75rem 1.5rem',
  background: vars.color.accentSoft,
  border: `1.5px solid ${vars.color.borderSoft}`,
  borderRadius: '624px',
  color: vars.color.primary,
  fontSize: '0.95rem',
  fontWeight: 500,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default',
  selectors: {
    '&:hover': {
      background: vars.color.accentTint,
      borderColor: vars.color.border,
      transform: 'translateY(-2px)',
      boxShadow: '0 2px 8px rgba(0, 102, 204, 0.08)',
    },
  },
});
