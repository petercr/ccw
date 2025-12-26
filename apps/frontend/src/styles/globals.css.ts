// This file ensures ALL global styles are always loaded as part of the main bundle
// by explicitly importing the most critical CSS files at the root level.
// This prevents vanilla-extract CSS from being tree-shaken during code splitting.
// See: https://github.com/vercel/next.js/issues/53858

// Theme and global vanilla-extract styles
import '@/styles/theme.css.ts';
import '@/components/GlobalLayout/GlobalLayout.css.ts';

const blockCssModules = import.meta.glob('../components/PortableText/**/*.css.ts', { eager: true });

if (import.meta.env.DEV) {
  console.group('[vanilla-extract] Global block CSS loaded');

  const modulePaths = Object.keys(blockCssModules);

  if (modulePaths.length === 0) {
    console.warn('⚠️ No block CSS modules found in ../components/PortableText/**/*.css.ts');
  } else {
    modulePaths.forEach((p) => console.log('✔️ Loaded:', p.replace(/\.{2}\//g, 'src/')));
  }

  console.groupEnd();
}

void blockCssModules;
