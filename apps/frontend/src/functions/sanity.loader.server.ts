import { apiVersion, dataset, projectId } from '@/sanity/projectDetails.ts';
import { setServerClient } from '@/sanity/sanity.loader.ts';
import { createClient } from '@sanity/client';
import { loadQuery } from '@sanity/react-loader';

export const sanityLoaderServer = () => {
	const client = createClient({
		projectId,
		dataset,
		useCdn: true,
		apiVersion,
		token: process.env.SANITY_READ_TOKEN,
		stega: {
			enabled: true,
			studioUrl: process.env.SANITY_STUDIO_URL || process.env.VITE_SANITY_STUDIO_URL || 'http://localhost:3333',
		},
	});
	setServerClient(client);
	return loadQuery;
};
