import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner.tsx';
import { workProjectsLoader } from '@/loaders/workProjects.ts';
import { WorkProjectsPage } from '@/pages/WorkProjects/WorkProjects.tsx';
import { workProjectsMeta } from '@/pages/WorkProjects/meta.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/our-work')({
  component: WorkProjectsPage,
  loader: workProjectsLoader,
  head: ({ match }) => workProjectsMeta(match.fullPath),
  pendingComponent: LoadingSpinner,
});
