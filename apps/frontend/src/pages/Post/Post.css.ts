import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.ts';
import { textContent } from '@/styles/shared/textContent.css.ts';

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  minHeight: '100vh',
  background: `linear-gradient(180deg, ${vars.color.bg} 0%, ${vars.color.bgAlt} 50%, ${vars.color.bgSoft} 100%)`,
  paddingTop: '3rem',
  paddingBottom: '7rem',
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
      paddingTop: '0',
    },
  },
});

export const textContainer = style({
  gridColumn: '1 / -1',
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  '@media': {
    'screen and (max-width: 768px)': {
      gridColumn: '1 / -1',
    },
  },
});

export const header = style([textContent]);

export const ingress = style([
  textContent,
  {
    fontSize: '1.375rem',
    fontWeight: 300,
    lineHeight: 1.7,
    marginBottom: '3.5rem',
    marginTop: '1.75rem',
    letterSpacing: '-0.01em',
    color: vars.color.text,
    fontStyle: 'italic',
    position: 'relative',
    paddingLeft: '1.15rem',
    borderLeft: `4px solid ${vars.color.primary}`,
    background: `linear-gradient(90deg, ${vars.color.accentSoft} 0%, transparent 65%)`,
    boxShadow: 'inset 0 0 0 999px rgba(255,255,255,0.02)',
    selectors: {
      '[data-theme="dark"] &': {
        color: '#F5F9FC',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
        boxShadow: 'inset 0 0 0 999px rgba(0,0,0,0.08)',
        borderLeft: `4px solid ${vars.color.primaryAlt}`,
      },
    },
    '@media': {
      'screen and (max-width: 768px)': {
        fontSize: '1.2rem',
        marginBottom: '3rem',
        paddingLeft: '0.9rem',
        borderLeft: `3px solid ${vars.color.primary}`,
      },
    },
  },
]);

export const portableTextContainer = style({
  gridColumn: '1 / -1',
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  paddingLeft: '2.5rem',
  paddingRight: '2.5rem',
  '@media': {
    'screen and (max-width: 768px)': {
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
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

export const metaBar = style([
  textContent,
  {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8rem',
    letterSpacing: '0.03em',
    color: vars.color.textDim,
    marginTop: '1rem',
    marginBottom: '1rem',
    '@media': {
      'screen and (max-width: 768px)': {
        marginLeft: '1.25rem',
      },
    },
    selectors: {
      '[data-theme="dark"] &': { color: '#C9D1D9' },
    },
  },
]);

export const metaItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
});

export const metaSeparator = style({
  opacity: 0.5,
});
