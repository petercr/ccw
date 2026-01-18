import { createFileRoute } from '@tanstack/react-router';
import { WorkProjectsPage } from '@/pages/WorkProjects/WorkProjects.tsx';
import { workProjectsLoader } from '@/loaders/workProjects.ts';
import { workProjectsMeta } from '@/pages/WorkProjects/meta.ts';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner.tsx';

export const Route = createFileRoute('/our-work')({
  component: WorkProjectsPage,
  loader: workProjectsLoader,
  head: ({ match }) => workProjectsMeta(match.fullPath),
  pendingComponent: LoadingSpinner,
});
