import type { AccordionBlock } from '@/types/sanitySchemas.ts';
import { PortableText } from '@portabletext/react';
import type { PortableTextTypeComponentProps } from '@portabletext/react';
import type React from 'react';
import { useState } from 'react';
import {
  accordionButton,
  accordionContainer,
  accordionContentStyle,
  accordionIcon,
  accordionItem,
} from './AccordionSerializer.css.ts';

export const AccordionSerializer: React.FC<PortableTextTypeComponentProps<AccordionBlock>> = ({
  value: { content },
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (currentIndex: number) => {
    if (currentIndex === openIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(currentIndex);
    }
  };

  return (
    <div className={accordionContainer}>
      {content?.map(({ title, accordionContent, _key }, index) => (
        <div key={_key} className={accordionItem}>
          <button className={accordionButton} onClick={() => handleClick(index)} aria-expanded={openIndex === index}>
            <span>{title}</span>
            <span className={`${accordionIcon} ${openIndex === index ? 'open' : ''}`}>▼</span>
          </button>
          {openIndex === index ? (
            <div className={accordionContentStyle}>
              {accordionContent ? <PortableText value={accordionContent} /> : null}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
