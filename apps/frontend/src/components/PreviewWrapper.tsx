import { useQuery } from "@/sanity/sanity.loader.ts";
import type { ContentSourceMap } from "@sanity/client";
import type { ReactNode } from "react";

export type PreviewableComponent = (props: {
  data: unknown;
  encodeDataAttribute?: (fieldName: Array<string>) => string | undefined;
}) => ReactNode;

interface PreviewWrapperProps {
  query: string;
  params: Record<string, string | null>;
  initial:
    | { data: unknown; sourceMap: ContentSourceMap | undefined }
    | undefined;
  component: PreviewableComponent;
}

/**
 * Lazy-loaded wrapper for preview mode data fetching.
 * Uses @sanity/react-loader's useQuery for live preview updates.
 * This component should always be loaded via React.lazy() to keep
 * @sanity/react-loader out of the initial client bundle.
 */
export default function PreviewWrapper({
  query,
  params,
  initial,
  component: Component,
}: PreviewWrapperProps): ReactNode {
  const { data, encodeDataAttribute } = useQuery(
    query,
    params,
    initial
      ? {
          initial: {
            data: initial.data,
            sourceMap: initial.sourceMap,
          },
        }
      : undefined,
  );

  return <Component data={data} encodeDataAttribute={encodeDataAttribute} />;
}
