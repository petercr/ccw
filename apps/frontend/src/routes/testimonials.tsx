import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner.tsx';
import { testimonialsLoader } from '@/loaders/testimonials.ts';
import { TestimonialsPage } from '@/pages/Testimonials/Testimonials.tsx';
import { testimonialsMeta } from '@/pages/Testimonials/meta.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/testimonials')({
	component: TestimonialsPage,
	loader: testimonialsLoader,
	head: ({ match }) => testimonialsMeta(match.fullPath),
	pendingComponent: LoadingSpinner,
});
