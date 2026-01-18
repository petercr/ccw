import { createFileRoute } from '@tanstack/react-router';
import { TestimonialsPage } from '@/pages/Testimonials/Testimonials.tsx';
import { testimonialsLoader } from '@/loaders/testimonials.ts';
import { testimonialsMeta } from '@/pages/Testimonials/meta.ts';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner.tsx';

export const Route = createFileRoute('/testimonials')({
  component: TestimonialsPage,
  loader: testimonialsLoader,
  head: ({ match }) => testimonialsMeta(match.fullPath),
  pendingComponent: LoadingSpinner,
});
