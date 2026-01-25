import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function getContext() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				// Data fetched in loaders is considered fresh, don't refetch on mount
				staleTime: 1000 * 60 * 5, // 5 minutes
				// Don't refetch on window focus during development
				refetchOnWindowFocus: false,
				// Don't retry failed queries automatically on client
				retry: typeof window === 'undefined' ? 3 : false,
			},
		},
	});
	return {
		queryClient,
	};
}

export function Provider({ children, queryClient }: { children: React.ReactNode; queryClient: QueryClient }) {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
