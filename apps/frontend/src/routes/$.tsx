import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner.tsx';
import { head } from '@/head/head.ts';
import { documentLoader } from '@/loaders/document.ts';
import { DocumentPage } from '@/pages/Document/Document.tsx';
import { createFileRoute } from '@tanstack/react-router';

// Catch All Route - data is fetched based on the relative URL which should be maintained on all documents in Sanity.
export const Route = createFileRoute('/$')({
  component: DocumentPage,
  loader: documentLoader,
  head: ({ loaderData, match }) => head(loaderData?.initial.data || undefined, match.pathname),
  pendingComponent: LoadingSpinner, // Show spinner during navigation to prevent flash of 404
});
