import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.ts';

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  gridColumn: '1 / -1',
  marginTop: '2rem',
  marginBottom: '3rem',
});

export const sliderContainer = style({
  overflow: 'hidden',
  justifyContent: 'center',
});

globalStyle(`${sliderContainer} .slick-track`, {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

globalStyle(`${sliderContainer} .slick-list`, {
  height: 'auto',
});

globalStyle(`${sliderContainer} .slick-slider`, {
  position: 'relative',
  display: 'block',
  boxSizing: 'border-box',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  userSelect: 'none',
});

// Slick prev/next buttons with improved styling
globalStyle(`${sliderContainer} .slick-prev, ${sliderContainer} .slick-next`, {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'block',
  width: '40px',
  height: '40px',
  padding: 0,
  margin: 0,
  border: 'none',
  background: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  cursor: 'pointer',
  fontSize: '0',
  lineHeight: '40px',
  textAlign: 'center',
  zIndex: 10,
  transition: 'all 0.3s ease',
  borderRadius: '3px',
});

globalStyle(`${sliderContainer} .slick-prev:hover, ${sliderContainer} .slick-next:hover`, {
  background: 'rgba(0, 0, 0, 0.9)',
  outline: 'none',
});

globalStyle(`${sliderContainer} .slick-prev:focus, ${sliderContainer} .slick-next:focus`, {
  outline: 'none',
});

globalStyle(`${sliderContainer} .slick-prev`, {
  left: '15px',
});

globalStyle(`${sliderContainer} .slick-next`, {
  right: '15px',
});

// Slick arrow styling using ::before pseudo-elements
globalStyle(`${sliderContainer} .slick-prev:before`, {
  content: '"←"',
  fontSize: '20px',
  lineHeight: '40px',
  color: 'white',
  display: 'block',
});

globalStyle(`${sliderContainer} .slick-next:before`, {
  content: '"→"',
  fontSize: '20px',
  lineHeight: '40px',
  color: 'white',
  display: 'block',
});

// Slick dots navigation styling
globalStyle(`${sliderContainer} .slick-dots`, {
  position: 'relative',
  top: '0.5rem',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'block',
  width: '100%',
  padding: 0,
  margin: 0,
  listStyle: 'none',
  textAlign: 'center',
  zIndex: 15,
});

globalStyle(`${sliderContainer} .slick-dots li`, {
  position: 'relative',
  display: 'inline-block',
  width: '20px',
  height: '20px',
  margin: '0 5px',
  padding: 0,
  cursor: 'pointer',
});

globalStyle(`${sliderContainer} .slick-dots li button`, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '20px',
  height: '20px',
  padding: 0,
  margin: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  font: '0/0 a',
  color: 'transparent',
  outline: 'none',
});

globalStyle(`${sliderContainer} .slick-dots li button:before`, {
  fontFamily: 'slick',
  fontSize: '16px',
  lineHeight: '20px',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '20px',
  height: '20px',
  content: '"•"',
  textAlign: 'center',
  opacity: 0.6,
  color: 'rgba(0, 0, 0, 0.8)',
  textShadow: '0 0 2px rgba(255,255,255,0.5)',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  transition: 'opacity 0.2s ease',
});

// Dark mode adjustments for dots
globalStyle(`[data-theme="dark"] ${sliderContainer} .slick-dots li button:before`, {
  color: 'rgba(255, 255, 255, 0.6)',
  textShadow: '0 0 2px rgba(0,0,0,0.5)',
});

globalStyle(`${sliderContainer} .slick-dots li.slick-active button:before`, {
  opacity: 1,
  color: vars.color.primary,
  textShadow: `0 0 2px rgba(0,0,0,0.3), 0 0 6px ${vars.color.primary}`,
});

export const figure = style({
  margin: '0 1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const image = style({
  display: 'block',
  width: '100%',
  height: 'auto',
  maxHeight: '50vh',
  objectFit: 'contain',
  marginTop: '0!important',
  marginBottom: '0!important',
});

export const figcaption = style({
  marginTop: '0.5rem',
  fontSize: '0.875rem',
  textAlign: 'center',
});

export const captionText = style({
  marginBottom: '0.5rem',
  fontWeight: 500,
});

export const credits = style({
  marginTop: '0.75rem',
  fontSize: '0.75rem',
  fontStyle: 'italic',
});
