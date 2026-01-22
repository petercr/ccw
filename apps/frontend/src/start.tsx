import { securityMiddleware } from '@/middlewares/securityMiddleware.ts';
import { createStart } from '@tanstack/react-start';

export const startInstance = createStart(() => {
	return {
		requestMiddleware: [securityMiddleware],
	};
});
