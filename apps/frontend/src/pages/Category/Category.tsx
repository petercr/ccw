import { MainImage } from '@/components/MainImage/MainImage.tsx';
import { Title } from '@/components/Title/Title.tsx';
import type { PageProps } from '@/types/PageProps.ts';
import type { CategoryDocument } from '@/types/category.ts';
import {
  container,
  header as headerStyle,
  ingress as ingressStyle,
  keywordItem,
  keywordsList,
  keywordsSection,
  keywordsTitle,
  textContainer,
} from './Category.css.ts';

export const CategoryPage = ({ data, encodeDataAttribute }: PageProps<CategoryDocument>) => {
  if (!data) {
    return null;
  }

  const { title, mainImage, description, seo } = data;

  return (
    <article className={container}>
      <header className={headerStyle}>{title ? <Title>{title}</Title> : null}</header>
      <div className={textContainer}>
        {typeof mainImage !== 'undefined' ? (
          <MainImage
            image={mainImage}
            encodeDataAttribute={encodeDataAttribute ? encodeDataAttribute(['mainImage']) : undefined}
          />
        ) : null}
        {description ? <p className={ingressStyle}>{description}</p> : null}
        {seo?.keywords && seo.keywords.length > 0 ? (
          <div className={keywordsSection}>
            <h2 className={keywordsTitle}>Topics</h2>
            <ul className={keywordsList}>
              {seo.keywords.map((keyword: string | undefined, index: number) => (
                <li key={index} className={keywordItem}>
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
