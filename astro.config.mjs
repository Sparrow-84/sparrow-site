import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// The production domain. Keep this set even while previewing on *.pages.dev so
// canonical URLs and the generated sitemap always describe sparrowinc.org and
// search engines never index the staging host.
export default defineConfig({
  site: 'https://sparrowinc.org',
  output: 'static',
  integrations: [tailwind(), mdx(), sitemap()],
});
