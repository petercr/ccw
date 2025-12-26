import { createStart } from '@tanstack/react-start';
import { securityMiddleware } from '@/middlewares/securityMiddleware.ts';

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [securityMiddleware],
  };
});
