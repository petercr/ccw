import { CategoryShowcase } from '@/components/CategoryShowcase/CategoryShowcase.tsx';
import type { CategoryStub } from '@/types/category.ts';
import { section, sectionTitle } from '../Home.css.ts';

interface CategoriesSectionProps {
  categories: Array<CategoryStub>;
}
export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className={section}>
      <h2 className={sectionTitle}>Explore Categories</h2>
      <CategoryShowcase categories={categories} limit={9} headingText="" showAllLink={false} />
    </section>
  );
}
