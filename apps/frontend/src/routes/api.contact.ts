import { createFileRoute } from '@tanstack/react-router';
import type { RouteMethodResult } from '@tanstack/react-start';
import { handleContactSubmission } from '@/server/contact/handleContactSubmission.ts';
import type { ContactResponse } from '@/server/contact/schema.ts';

function jsonResponse(body: ContactResponse, status: number) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-store',
		},
	});
}

export const Route = createFileRoute('/api/contact')({
	server: {
		handlers: {
			POST: async ({ request }): Promise<RouteMethodResult<ContactResponse>> => {
				let payload: unknown;
				try {
					payload = await request.json();
				} catch {
					console.warn('[contact] Invalid JSON body');
					return jsonResponse(
						{ success: false, error: 'Invalid JSON body' },
						400,
					) as unknown as RouteMethodResult<ContactResponse>;
				}

				const result = await handleContactSubmission(payload);
				const status = result.success ? 200 : result.fieldErrors ? 400 : 500;
				return jsonResponse(result, status) as unknown as RouteMethodResult<ContactResponse>;
			},
		},
	},
});
