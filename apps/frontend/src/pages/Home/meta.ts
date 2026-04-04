import { seo } from "@/lib/seo.ts";
import type { HomeDocument } from "@/types/home.ts";

export const homeMeta = (document?: HomeDocument, relativeUrl?: string) => {
  return {
    meta: [
      ...seo({
        title: document?.title || "Cape Cod World",
        description: document?.subTitle || "Bringing Your Ideas to The World",
        relativeUrl: relativeUrl,
      }),
    ],
  };
};
