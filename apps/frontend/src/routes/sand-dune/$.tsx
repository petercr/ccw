import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const SanityStudio = lazy(() =>
	Promise.all([import('sanity'), import('@/sanity/studioConfig')]).then(([{ Studio }, { default: config }]) => ({
		default: () => <Studio config={config} />,
	})),
);

export const Route = createFileRoute('/sand-dune/$')({
	ssr: false,
	component: () => (
		<Suspense fallback={<div>Loading Studio...</div>}>
			<SanityStudio />
		</Suspense>
	),
});
