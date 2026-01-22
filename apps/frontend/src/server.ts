import { sanityLoaderServer } from '@/functions/sanity.loader.server.ts';
import handler from '@tanstack/react-start/server-entry';
import { config } from 'dotenv'; //

type MyRequestContext = {
  request: Request;
};

declare module '@tanstack/react-start' {
  interface Register {
    server: {
      requestContext: MyRequestContext;
    };
  }
}

config();

export default {
  async fetch(request: Request) {
    sanityLoaderServer();

    // Apply security headers middleware
    return handler.fetch(request, { context: { request } });
  },
};
