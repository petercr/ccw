import type { ReactNode } from 'react';
import { blockquote, h2, h3, h4, p, pre } from './block.css.ts';

// Example block serializer for Portable Text
export const block = {
  normal: ({ children }: { children?: ReactNode }) => (children ? <p className={p}>{children}</p> : null),
  h1: ({ children }: { children?: ReactNode }) => (children ? <h1>{children}</h1> : null),
  h2: ({ children }: { children?: ReactNode }) => (children ? <h2 className={h2}>{children}</h2> : null),
  h3: ({ children }: { children?: ReactNode }) => (children ? <h3 className={h3}>{children}</h3> : null),
  h4: ({ children }: { children?: ReactNode }) => (children ? <h4 className={h4}>{children}</h4> : null),
  code: ({ children }: { children?: ReactNode }) => (children ? <pre className={pre}>{children}</pre> : null),
  blockquote: ({ children }: { children?: ReactNode }) =>
    children ? <blockquote className={blockquote}>{children}</blockquote> : null,
};
