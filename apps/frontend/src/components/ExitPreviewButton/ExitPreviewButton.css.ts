import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const exitButton = style({
	position: 'fixed',
	bottom: '20px',
	right: '20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
	padding: '16px',
	backgroundColor: vars.color.danger,
	color: 'white',
	borderRadius: '8px',
	boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
	zIndex: 9999,
	maxWidth: '320px',
});

export const warningText = style({
	fontSize: '13px',
	lineHeight: '1.5',
	margin: 0,
});

export const exitButtonInner = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	justifyContent: 'center',
	padding: '10px 16px',
	backgroundColor: 'rgba(255, 255, 255, 0.2)',
	border: '1px solid rgba(255, 255, 255, 0.3)',
	borderRadius: '6px',
	color: 'white',
	cursor: 'pointer',
	fontSize: '14px',
	fontWeight: '600',
	transition: 'all 0.2s ease',

	':hover': {
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
	},

	':active': {
		transform: 'scale(0.98)',
	},

	':focus-visible': {
		outline: '2px solid white',
		outlineOffset: '2px',
	},
});
