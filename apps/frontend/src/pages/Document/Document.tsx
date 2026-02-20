import {
  withPreviewData,
  withPublishedData,
} from "@/components/withDocument.tsx";
import { CategoryPage } from "@/pages/Category/Category.tsx";
import { NotFoundPage } from "@/pages/NotFound/NotFound.tsx";
import { PostPage } from "@/pages/Post/Post.tsx";
import { Route } from "@/routes/$.tsx";
import { documentQuery } from "@/sanity/queries/documentQuery.ts";
import { previewStore } from "@/stores/previewStore.ts";
import type { PageProps } from "@/types/PageProps.ts";
import type { DocumentType } from "@/types/documentType.ts";
import { sanityTypeLiterals } from "@santan/shared/types";
// Imports types, route, HOCs, constants, and page components
import { useStore } from "@tanstack/react-store";

// Renders the correct page based on the document type
export const Document = ({
  data,
  encodeDataAttribute,
}: PageProps<DocumentType>) => {
  // If data is explicitly null, document doesn't exist
  if (data === null) {
    return <NotFoundPage />;
  }

  // If data is undefined, still loading (shouldn't happen with suspense)
  if (data === undefined) {
    return null;
  }

  // Switch on the document type to render the appropriate page
  switch (data._type) {
    case sanityTypeLiterals.category:
      return (
        <CategoryPage data={data} encodeDataAttribute={encodeDataAttribute} />
      );
    case sanityTypeLiterals.post:
      return <PostPage data={data} encodeDataAttribute={encodeDataAttribute} />;
    default:
      return <NotFoundPage />;
  }
};

// Wraps Document with preview and published data HOCs
const DocumentPreview = withPreviewData<DocumentType>(Document);
const DocumentPublished = withPublishedData<DocumentType>(Document);

// Top-level page component, chooses preview or published mode
export function DocumentPage() {
  // Loads route data and preview state from TanStack Router
  const {
    initial,
    query,
    params,
    options,
    sanity: { isPreview: isPreviewFromLoader },
  } = Route.useLoaderData();

  // Use the reactive preview store instead of only the loader's isPreview
  const { isPreview: isPreviewFromStore } = useStore(
    previewStore,
    (state) => state,
  );

  // Use the store value (client-side reactive) with loader as fallback (SSR)
  const isPreview = isPreviewFromStore || isPreviewFromLoader;

  // Renders preview or published document based on isPreview flag
  return isPreview ? (
    <DocumentPreview
      query={query}
      params={params}
      initial={initial.data ? initial : undefined}
    />
  ) : (
    <DocumentPublished
      tanstackQuery={documentQuery(params.fullSlug, options)}
      initial={initial.data || undefined}
    />
  );
}
