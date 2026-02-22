import { createTheme, createThemeContract } from '@vanilla-extract/css';

// Define the theme contract (structure)
const themeContract = createThemeContract({
	color: {
		bg: null,
		bgAlt: null,
		bgSoft: null,
		text: null,
		textDim: null,
		border: null,
		borderSoft: null,
		primary: null,
		primaryAlt: null,
		primaryDeep: null,
		accentTint: null,
		accentSoft: null,
		codeBg: null,
		overlay: null,
		glass: null,
		// Added higher-contrast tokens
		surfaceElevated: null,
		surfaceHover: null,
		interactiveBg: null,
		interactiveBgHover: null,
		danger: null,
		warning: null,
		success: null,
	},
	radius: {
		xs: null,
		sm: null,
		md: null,
		lg: null,
		xl: null,
		pill: null,
	},
	shadow: {
		subtle: null,
		float: null,
		focus: null,
	},
	space: {
		0: null,
		1: null,
		2: null,
		3: null,
		4: null,
		5: null,
		6: null,
		8: null,
		10: null,
		12: null,
	},
	font: {
		mono: null,
	},
});

// Light theme (default)
export const lightTheme = createTheme(themeContract, {
	color: {
		bg: '#f5f7fa',
		bgAlt: '#ffffff',
		bgSoft: '#f0f4f8',
		text: 'rgba(29,29,31,0.82)',
		textDim: 'rgba(0,0,0,1.0)',
		border: 'rgba(0,102,204,0.8)',
		borderSoft: 'rgba(0, 0, 0, 0.9)',
		primary: '#000000',
		primaryAlt: '#005bb5',
		primaryDeep: '#00447d',
		accentTint: 'rgba(0,102,204,0.06)',
		accentSoft: 'rgba(0,102,204,0.04)',
		codeBg: 'rgba(0,0,0,0.04)',
		overlay: 'rgba(0,0,0,0.25)',
		glass: 'rgba(255,255,255,0.65)',
		// New tokens light
		surfaceElevated: 'linear-gradient(90deg, #fef5ff 0%, #f0e5ff 100%)',
		surfaceHover: '#f9fbfd',
		interactiveBg: '#0066cc',
		interactiveBgHover: '#005bb5',
		danger: '#d92f2f',
		warning: '#e6a700',
		success: '#178544',
	},
	radius: {
		xs: '4px',
		sm: '8px',
		md: '12px',
		lg: '20px',
		xl: '32px',
		pill: '624px',
	},
	shadow: {
		subtle: '8px 7px 8px 0px #0000004A;',
		float: '0 8px 24px rgba(0,0,0,0.08)',
		focus: '0 0 0 3px rgba(0,102,204,0.35)',
	},
	space: {
		0: '0',
		1: '0.25rem',
		2: '0.5rem',
		3: '0.75rem',
		4: '1rem',
		5: '1.25rem',
		6: '1.5rem',
		8: '2rem',
		10: '2.5rem',
		12: '3rem',
	},
	font: {
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
	},
});

// Dark theme
export const darkTheme = createTheme(themeContract, {
	color: {
		bg: '#000000', // Marine blue base background
		bgAlt: '#112B42', // Raised panel background
		bgSoft: '#15354D', // Soft section background
		text: '#F5F9FC', // Near-white text for optimal readability
		textDim: '#FFFFFF', // Muted text (metadata)
		border: '#2F5470', // Contrast border
		borderSoft: '#1E3A52', // Softer border
		primary: '#4DB8FF', // Primary accent (light azure on dark blue)
		primaryAlt: '#33A4F0', // Mid-tone highlight
		primaryDeep: '#33A4F0', // Deep accent
		accentTint: 'rgba(77,184,255,0.18)', // Subtle accent background (hover/labels)
		accentSoft: 'rgba(77,184,255,0.10)', // Extra soft background
		codeBg: '#102638', // Code block background
		overlay: 'rgba(0,0,0,0.55)',
		glass: 'rgba(17,43,66,0.64)',
		surfaceElevated: '#000000', // Cards / elevated surfaces
		surfaceHover: '#1A3A53', // Hover for elevated surfaces
		interactiveBg: '#1E6FB8', // Primary interactive
		interactiveBgHover: '#2480D1', // Hover for interactive
		danger: '#FF5F5F',
		warning: '#FFC94D',
		success: '#2FB573',
	},
	radius: {
		xs: '4px',
		sm: '8px',
		md: '12px',
		lg: '20px',
		xl: '32px',
		pill: '624px',
	},
	shadow: {
		subtle: '0 1px 2px rgba(0,0,0,0.55)',
		float: '0 8px 32px rgba(0,0,0,0.6)',
		focus: '0 0 0 3px rgba(77,184,255,0.45)',
	},
	space: {
		0: '0',
		1: '0.25rem',
		2: '0.5rem',
		3: '0.75rem',
		4: '1rem',
		5: '1.25rem',
		6: '1.5rem',
		8: '2rem',
		10: '2.5rem',
		12: '3rem',
	},
	font: {
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
	},
});

// Export the contract as vars for use in components
export const vars = themeContract;
