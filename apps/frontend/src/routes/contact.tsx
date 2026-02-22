import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner.tsx';
import { ContactPage } from '@/pages/Contact/Contact.tsx';
import { contactMeta } from '@/pages/Contact/meta.ts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact')({
	component: ContactPage,
	head: ({ match }) => contactMeta(match.fullPath),
	pendingComponent: LoadingSpinner,
});
