import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { schemaTypes } from '@santan/studio/schemaTypes';
import { apiVersion, dataset, projectId } from '@/sanity/projectDetails.ts';

export default defineConfig({
	name: 'default',
	title: 'CCW Studio',
	basePath: '/sand-dune',

	projectId,
	dataset,
	apiVersion,

	plugins: [structureTool(), visionTool()],

	schema: {
		types: schemaTypes,
	},
});
