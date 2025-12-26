import { li, ol, ul } from './list.css.ts';
import type { ReactNode } from 'react';

export const list = ({ type, children }: { type?: 'number' | 'bullet'; children?: ReactNode }) => {
  if (type === 'number') return <ol className={ol}>{children}</ol>;
  return <ul className={ul}>{children}</ul>; // default bullet
};

export const listItem = ({ children }: { children?: ReactNode; value?: any }) => {
  return <li className={li}>{children}</li>;
};
