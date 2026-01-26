import {
  heroContent,
  heroSection,
  heroSubtitle,
  heroTitle,
} from "../Home.css.ts";

interface HeroSectionProps {
  title?: string | null;
  subTitle?: string | null;
}

export function HeroSection({ title, subTitle }: HeroSectionProps) {
  return (
    <section className={heroSection}>
      <div className={heroContent}>
        <h1 className={heroTitle}>{title}</h1>
        {subTitle && <p className={heroSubtitle}>{subTitle}</p>}
      </div>
    </section>
  );
}
