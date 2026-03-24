import { useSuspenseQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";

interface PublicProps<T> {
  tanstackQuery: any; // Use any here to avoid complex type inference issues with queryOptions
  initial: T | undefined;
}

interface PageComponentProps<T> {
  data: T | undefined | null;
  encodeDataAttribute?: (fieldName: Array<string>) => string | undefined;
}

const withPublishedData = <T,>(
  PageComponent: (props: PageComponentProps<T>) => ReactNode,
) => {
  return ({ tanstackQuery }: PublicProps<T>) => {
    const { data } = useSuspenseQuery(tanstackQuery);
    // Safely extract the data from the query result, preserving null
    const componentData = (data as { data: T | null } | null)?.data ?? null;
    return <PageComponent data={componentData} />;
  };
};

export { withPublishedData };
