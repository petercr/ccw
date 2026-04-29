import AppLogo from "../../public/web-app-manifest-512x512-v2.png?url";

const basePath = import.meta.env.VITE_BASE_PATH || process.env.VITE_BASE_PATH || "";
const siteUrl = import.meta.env.VITE_SITE_URL || process.env.VITE_SITE_URL || process.env.SITE_URL || "";
const canonicalBaseUrl = isAbsoluteUrl(siteUrl) ? siteUrl : isAbsoluteUrl(basePath) ? basePath : "";

/**
 * Strips Sanity Stega encoding (zero-width and invisible Unicode characters)
 * from a string so it's clean for use in meta tags and SEO values.
 */
const stegaPattern =
  /[\u200B-\u200F\u2028-\u202F\u2060-\u2063\uFEFF\uFFF9-\uFFFB]/g;

function stripStega(value: string): string {
  return value.replace(stegaPattern, "");
}

function isAbsoluteUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function joinUrl(base: string, path: string): string {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

function toAbsoluteUrl(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  if (isAbsoluteUrl(value)) {
    return value;
  }

  if (canonicalBaseUrl) {
    return joinUrl(canonicalBaseUrl, value);
  }

  return undefined;
}

export const seo = ({
  title,
  description,
  keywords,
  image,
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
  const cleanRelativeUrl = relativeUrl ? stripStega(relativeUrl) : undefined;

  const defaultImagePath = `${basePath}${AppLogo.replace("/public", "")}`;
  const ogImage = toAbsoluteUrl(image || defaultImagePath);
  const absoluteUrl = toAbsoluteUrl(cleanRelativeUrl);

  const keywordsString = Array.isArray(keywords)
    ? keywords.map(stripStega).join(", ")
    : keywords
      ? stripStega(keywords)
      : undefined;

  return [
    { title: cleanTitle },
    { name: "twitter:title", content: cleanTitle },
    { property: "og:title", content: cleanTitle },
    { property: "og:type", content: "website" },
    ...(ogImage
      ? [
          { name: "twitter:image", content: ogImage },
          { property: "og:image", content: ogImage },
        ]
      : []),
    { name: "twitter:card", content: "summary_large_image" },
    ...(cleanDescription
      ? [
          { name: "description", content: cleanDescription },
          { name: "twitter:description", content: cleanDescription },
          { property: "og:description", content: cleanDescription },
        ]
      : []),
    ...(keywordsString ? [{ name: "keywords", content: keywordsString }] : []),
    ...(absoluteUrl
      ? [
          { property: "og:url", content: absoluteUrl },
          { name: "twitter:url", content: absoluteUrl },
        ]
      : []),
  ];
};
