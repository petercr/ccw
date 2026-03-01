import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Data fetched in loaders is considered fresh, don't refetch on mount
        staleTime: 1000 * 60 * 5, // 5 minutes
        // Don't refetch on window focus during development
        refetchOnWindowFocus: false,
        // Retry configuration: retry on server, limited retry on client for network errors
        retry: (failureCount, error) => {
          // Don't retry if request was aborted (user navigated away)
          if (error instanceof Error && error.name === "AbortError") {
            return false;
          }
          // On server, retry up to 3 times
          if (typeof window === "undefined") {
            return failureCount < 3;
          }
          // On client, retry once for network errors only
          if (
            error instanceof Error &&
            ("isNetworkError" in error || error.message.includes("network"))
          ) {
            return failureCount < 1;
          }
          return false;
        },
        // Exponential backoff for retries
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      },
    },
  });
  return {
    queryClient,
  };
}

export function Provider({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
