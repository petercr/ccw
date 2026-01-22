import { title } from '@/components/Title/Title.css.ts';
import type { PropsWithChildren } from 'react';

export function Title({ children }: PropsWithChildren) {
  return <h1 className={title}>{children}</h1>;
}
