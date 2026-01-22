import { createMiddleware } from '@tanstack/react-start';

import { getSanityStudioUrl } from '@/constants/config.ts';
import { getResponseHeaders, setResponseHeaders } from '@tanstack/react-start/server';

export const securityMiddleware = createMiddleware().server(({ next }) => {
	const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

	const studioUrl = getSanityStudioUrl();
	const studioOrigin = new URL(studioUrl).origin;

	const isLocal = process.env.LOCAL_ENV === 'true';

	const csp = [
		"default-src 'self'",
		`script-src 'self' blob: 'nonce-${nonce}' 'strict-dynamic'`, // Include the nonce
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
		"img-src 'self' data: https://cdn.sanity.io blob:",
		"font-src 'self' data: https://fonts.gstatic.com",
		"connect-src 'self' https://*.sanity.io wss://*.sanity.io ws://localhost:*",
		"worker-src 'self' blob:", // Allow web workers from blob URLs
		`frame-ancestors 'self' ${studioOrigin}`, // Allow Sanity Studio to embed the app
		"base-uri 'self'",
		"form-action 'self'",
		!isLocal && 'upgrade-insecure-requests', // Exclude for local environments
	]
		.filter(Boolean)
		.join('; ');

	// Replace newline characters and spaces
	const contentSecurityPolicyHeaderValue = csp.replace(/\s{2,}/g, ' ').trim();

	const headers = getResponseHeaders();

	// Content Security Policy
	headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

	// Don't set X-Frame-Options when we want to allow specific origins
	// X-Frame-Options: ALLOW-FROM is deprecated and not supported in modern browsers
	// We rely on CSP frame-ancestors instead
	headers.set('X-Content-Type-Options', 'nosniff');

	// XSS Protection (legacy browsers)
	headers.set('X-XSS-Protection', '1; mode=block');

	// Referrer Policy
	headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	// Permissions Policy
	headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=()');

	setResponseHeaders(headers);

	return next({
		context: {
			nonce,
		},
	});
});
