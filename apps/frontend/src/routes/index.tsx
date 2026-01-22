import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner.tsx';
import { homeLoader } from '@/loaders/home.ts';
import { HomePage } from '@/pages/Home/Home.tsx';
import { homeMeta } from '@/pages/Home/meta.ts';
import { createFileRoute } from '@tanstack/react-router';

// Index Route
export const Route = createFileRoute('/')({
  component: HomePage,
  loader: homeLoader,
  head: ({ loaderData, match }) => homeMeta(loaderData?.initial?.data.homeData, match.fullPath),
  pendingComponent: LoadingSpinner,
});
