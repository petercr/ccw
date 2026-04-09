import AppLogo from "../../public/web-app-manifest-512x512-v2.png?url";

const basePath = import.meta.env.VITE_BASE_PATH || process.env.VITE_BASE_PATH;

/**
 * Strips Sanity Stega encoding (zero-width and invisible Unicode characters)
 * from a string so it's clean for use in meta tags and SEO values.
 */
const stegaPattern =
  /[\u200B-\u200F\u2028-\u202F\u2060-\u2063\uFEFF\uFFF9-\uFFFB]/g;

function stripStega(value: string): string {
  return value.replace(stegaPattern, "");
}

export const seo = ({
  title,
  description,
  keywords,
  image = `${basePath}${AppLogo.replace("/public", "")}`,
  relativeUrl,
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string | Array<string>;
  relativeUrl?: string;
}) => {
  const cleanTitle = stripStega(title);
  const cleanDescription = description ? stripStega(description) : undefined;
  const absoluteUrl = relativeUrl ? `${basePath}${relativeUrl}` : undefined;
  const keywordsString = Array.isArray(keywords)
    ? keywords.map(stripStega).join(", ")
    : keywords
      ? stripStega(keywords)
      : undefined;

  return [
    { title: cleanTitle },
    { name: "twitter:title", content: cleanTitle },
    { name: "og:title", content: cleanTitle },
    { name: "og:type", content: "website" },
    { name: "twitter:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "og:image", content: image },
    ...(cleanDescription
      ? [
          { name: "description", content: cleanDescription },
          { name: "twitter:description", content: cleanDescription },
          { name: "og:description", content: cleanDescription },
        ]
      : []),
    ...(keywordsString ? [{ name: "keywords", content: keywordsString }] : []),
    ...(absoluteUrl
      ? [
          { name: "og:url", content: absoluteUrl },
          { name: "twitter:url", content: absoluteUrl },
        ]
      : []),
  ];
};
