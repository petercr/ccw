import { MainImage } from "@/components/MainImage/MainImage.tsx";
import PortableText from "@/components/PortableText/PortableText.tsx";
import type { PageProps } from "@/types/PageProps.ts";
import type { CategoryDocument } from "@/types/category.ts";
import {
  container,
  headerPill,
  headerTitle,
  ingress as ingressStyle,
  keywordItem,
  keywordsList,
  keywordsSection,
  keywordsTitle,
  textContainer,
} from "./Category.css.ts";

export const CategoryPage = ({
  data,
  encodeDataAttribute,
}: PageProps<CategoryDocument>) => {
  if (!data) {
    return null;
  }

  const { title, mainImage, description, seo } = data;

  return (
    <article className={container}>
      <header className={headerPill}>
        {title ? <h1 className={headerTitle}>{title}</h1> : null}
      </header>
      <div className={textContainer}>
        {typeof mainImage !== "undefined" ? (
          <MainImage
            image={mainImage}
            encodeDataAttribute={
              encodeDataAttribute
                ? encodeDataAttribute(["mainImage"])
                : undefined
            }
          />
        ) : null}
        {description ? (
          <div className={ingressStyle}>
            {typeof description === "string" ? (
              <p>{description}</p>
            ) : description.length > 0 ? (
              <PortableText value={description} />
            ) : null}
          </div>
        ) : null}
        {seo?.keywords && seo.keywords.length > 0 ? (
          <div className={keywordsSection}>
            <h2 className={keywordsTitle}>Topics</h2>
            <ul className={keywordsList}>
              {seo.keywords.map((keyword: string | undefined) => (
                <li key={keyword} className={keywordItem}>
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
};
