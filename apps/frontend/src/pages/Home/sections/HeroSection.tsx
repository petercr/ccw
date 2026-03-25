import {
  heroContent,
  heroSection,
  heroSubtitle,
  heroSubtitleEmojis,
  heroTitle,
} from "../Home.css.ts";

interface HeroSectionProps {
  title?: string | null;
  subTitle?: string | null;
}

const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
// Stega encoding inserts zero-width characters (\u200b, \u200c, \u200d, \ufeff) throughout text
const stegaChars = "\u200b\u200c\u200d\ufeff";

/** Splits trailing emojis from the subtitle so they can be styled separately on mobile. */
function splitTrailingEmojis(text: string) {
  // Strip Stega zero-width chars for matching, but find the split point in the original
  const clean = text.replace(new RegExp(`[${stegaChars}]`, "g"), "").trimEnd();
  const match = clean.match(/[\s\p{Emoji_Presentation}\p{Extended_Pictographic}]+$/u);
  if (!match) return { text, emojis: "" };
  const emojis = match[0].match(emojiRegex);
  if (!emojis) return { text, emojis: "" };
  const cleanTextPart = clean.slice(0, match.index).trimEnd();
  // Find the position in the original string that corresponds to the end of cleanTextPart
  let cleanIdx = 0;
  let origIdx = 0;
  while (cleanIdx < cleanTextPart.length && origIdx < text.length) {
    if (stegaChars.includes(text[origIdx])) {
      origIdx++;
    } else {
      cleanIdx++;
      origIdx++;
    }
  }
  return {
    text: text.slice(0, origIdx),
    emojis: emojis.join(" "),
  };
}

export function HeroSection({ title, subTitle }: HeroSectionProps) {
  const parts = subTitle ? splitTrailingEmojis(subTitle) : null;

  return (
    <section className={heroSection}>
      <div className={heroContent}>
        <h1 className={heroTitle}>{title}</h1>
        {parts && (
          <p className={heroSubtitle}>
            {parts.text}
            {parts.emojis && (
              <span className={heroSubtitleEmojis}>{parts.emojis}</span>
            )}
          </p>
        )}
      </div>
    </section>
  );
}
