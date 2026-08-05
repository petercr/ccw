import { sanityTypeLiterals } from '@santan/shared/types';
import { Briefcase, Home, Mail, Quote, Settings, Tags, Users } from 'lucide-react';
import DocumentsPane from 'sanity-plugin-documents-pane';
import type { DefaultDocumentNodeResolver, StructureBuilder, StructureResolver } from 'sanity/structure';

import { JSONPreview } from './components/JSONPreview';

export const structure: StructureResolver = (S) =>
	S.list()
		.id('root')
		.title('Content')
		.items([
			// Singleton, home page curation
			S.listItem().icon(Home).id('home').title('HomePage').child(defaultDocumentViews(S, sanityTypeLiterals.home)),
			// Singleton, site-wide settings
			S.listItem()
				.icon(Settings)
				.id('siteSettings')
				.title('Site Settings')
				.child(
					S.document()
						.schemaType('siteSettings')
						.documentId('siteSettings')
						.views([S.view.form(), S.view.component(JSONPreview).title('JSON')]),
				),
			S.divider(),
			// Document lists
			S.documentTypeListItem('post').title('Articles'),
			S.documentTypeListItem('category').title('Pages').icon(Tags),
			S.documentTypeListItem('testimonial').title('Testimonials').icon(Quote),
			S.documentTypeListItem('workProject').title('Our Work').icon(Briefcase),
			S.divider(),
			// Contact submissions (created by form sync; not manually authored)
			S.listItem()
				.icon(Mail)
				.id('contactSubmissions')
				.title('Contact submissions')
				.child(
					S.list()
						.id('contactSubmissionsMenu')
						.title('Contact submissions')
						.items([
							S.listItem()
								.id('contactSubmissionsAll')
								.title('All submissions')
								.child(
									S.documentTypeList('contactSubmission')
										.title('All submissions')
										.defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
										.canHandleIntent(() => false),
								),
							S.listItem()
								.id('contactSubmissionsNew')
								.title('New')
								.child(
									S.documentList()
										.id('contactSubmissionsNewList')
										.title('New')
										.schemaType('contactSubmission')
										.filter('_type == "contactSubmission" && responseStatus == "new"')
										.defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
										.canHandleIntent(() => false),
								),
							S.listItem()
								.id('contactSubmissionsInProgress')
								.title('In progress')
								.child(
									S.documentList()
										.id('contactSubmissionsInProgressList')
										.title('In progress')
										.schemaType('contactSubmission')
										.filter('_type == "contactSubmission" && responseStatus == "in_progress"')
										.defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
										.canHandleIntent(() => false),
								),
							S.listItem()
								.id('contactSubmissionsReplied')
								.title('Replied')
								.child(
									S.documentList()
										.id('contactSubmissionsRepliedList')
										.title('Replied')
										.schemaType('contactSubmission')
										.filter('_type == "contactSubmission" && responseStatus == "replied"')
										.defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
										.canHandleIntent(() => false),
								),
							S.listItem()
								.id('contactSubmissionsClosed')
								.title('Closed / spam')
								.child(
									S.documentList()
										.id('contactSubmissionsClosedList')
										.title('Closed / spam')
										.schemaType('contactSubmission')
										.filter(
											'_type == "contactSubmission" && responseStatus in ["closed", "spam"]',
										)
										.defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
										.canHandleIntent(() => false),
								),
						]),
				),
			S.divider(),
			S.documentTypeListItem('person').title('Persons').icon(Users), //Plural
		]);

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType, documentId }) => {
	switch (schemaType) {
		default:
			return defaultDocumentViews(S, schemaType as sanityTypeLiterals);
	}
};

const defaultDocumentViews = (S: StructureBuilder, documentType: sanityTypeLiterals) =>
	S.document()
		.schemaType(documentType)
		.views([
			S.view.form(),
			S.view.component(JSONPreview).title('JSON'),
			S.view
				.component(DocumentsPane)
				.options({
					query: `*[references($id)]`,
					params: { id: `_id` },
					options: { perspective: 'drafts' },
				})
				.title('Documents that reference this'),
		]);
