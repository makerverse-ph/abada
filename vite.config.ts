import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type HtmlTagDescriptor} from 'vite';
import {HOME_SEO, STRUCTURED_DATA} from './src/seo';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');

  const seoTags: HtmlTagDescriptor[] = [
    {tag: 'title', children: HOME_SEO.title, injectTo: 'head'},
    {tag: 'meta', attrs: {name: 'description', content: HOME_SEO.description}, injectTo: 'head'},
    {tag: 'meta', attrs: {name: 'robots', content: HOME_SEO.robots}, injectTo: 'head'},
    {tag: 'link', attrs: {rel: 'canonical', href: HOME_SEO.canonical}, injectTo: 'head'},
    {tag: 'meta', attrs: {property: 'og:title', content: HOME_SEO.title}, injectTo: 'head'},
    {tag: 'meta', attrs: {property: 'og:description', content: HOME_SEO.description}, injectTo: 'head'},
    {tag: 'meta', attrs: {property: 'og:url', content: HOME_SEO.canonical}, injectTo: 'head'},
    {tag: 'meta', attrs: {property: 'og:type', content: HOME_SEO.openGraph.type}, injectTo: 'head'},
    {tag: 'meta', attrs: {property: 'og:site_name', content: HOME_SEO.openGraph.siteName}, injectTo: 'head'},
    {tag: 'meta', attrs: {property: 'og:image', content: HOME_SEO.openGraph.image}, injectTo: 'head'},
    {tag: 'meta', attrs: {property: 'og:image:width', content: String(HOME_SEO.openGraph.imageWidth)}, injectTo: 'head'},
    {tag: 'meta', attrs: {property: 'og:image:height', content: String(HOME_SEO.openGraph.imageHeight)}, injectTo: 'head'},
    {tag: 'meta', attrs: {property: 'og:image:alt', content: HOME_SEO.openGraph.imageAlt}, injectTo: 'head'},
    {tag: 'meta', attrs: {name: 'twitter:card', content: HOME_SEO.twitter.card}, injectTo: 'head'},
    {tag: 'meta', attrs: {name: 'twitter:title', content: HOME_SEO.title}, injectTo: 'head'},
    {tag: 'meta', attrs: {name: 'twitter:description', content: HOME_SEO.description}, injectTo: 'head'},
    {tag: 'meta', attrs: {name: 'twitter:image', content: HOME_SEO.openGraph.image}, injectTo: 'head'},
    {tag: 'meta', attrs: {name: 'twitter:image:alt', content: HOME_SEO.openGraph.imageAlt}, injectTo: 'head'},
    {
      tag: 'script',
      attrs: {type: 'application/ld+json'},
      children: JSON.stringify(STRUCTURED_DATA).replace(/</g, '\\u003c'),
      injectTo: 'head',
    },
  ];

  if (env.VITE_GOOGLE_SITE_VERIFICATION?.trim()) {
    seoTags.push({
      tag: 'meta',
      attrs: {name: 'google-site-verification', content: env.VITE_GOOGLE_SITE_VERIFICATION.trim()},
      injectTo: 'head',
    });
  }

  if (env.VITE_BING_SITE_VERIFICATION?.trim()) {
    seoTags.push({
      tag: 'meta',
      attrs: {name: 'msvalidate.01', content: env.VITE_BING_SITE_VERIFICATION.trim()},
      injectTo: 'head',
    });
  }

  return {
    // Relative asset URLs work on both GitHub project Pages (/abada/)
    // and the production custom domain root without a rebuild-time toggle.
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'ssfi-seo-metadata',
        transformIndexHtml: {
          order: 'pre',
          handler: () => seoTags,
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
