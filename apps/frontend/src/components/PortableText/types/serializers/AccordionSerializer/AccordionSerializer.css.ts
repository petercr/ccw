import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.ts';
import { textContent } from '@/styles/shared/textContent.css.ts';

// Animation for content slide down
const slideDown = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-10px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const accordionContainer = style([
  textContent,
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    width: '100%',
    marginBottom: '3rem',
  },
]);

export const accordionItem = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  overflow: 'hidden',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      borderColor: vars.color.primary,
      boxShadow: vars.shadow.subtle,
    },
  },
});

export const accordionButton = style({
  width: '100%',
  textAlign: 'left',
  padding: '1.25rem 1.5rem',
  background: vars.color.bgAlt,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: '1rem',
  color: vars.color.text,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  selectors: {
    '&:hover': {
      background: vars.color.surfaceHover,
    },
    '&:active': {
      opacity: 0.95,
      transform: 'scale(0.99)',
    },
  },
});

export const accordionIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  marginLeft: '1rem',
  transition: 'transform 0.3s ease',
  flexShrink: 0,
  selectors: {
    '&.open': {
      transform: 'rotate(180deg)',
    },
  },
});

export const accordionContentStyle = style({
  padding: '1.5rem',
  background: vars.color.bgSoft,
  color: vars.color.text,
  animation: `${slideDown} 0.3s ease`,
  borderTop: `1px solid ${vars.color.border}`,
});

// ...existing code...
