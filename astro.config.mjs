import { defineConfig } from 'astro/config';

// Root Astro app. Publishing remains a separate, explicitly authorized step.
export default defineConfig({
  site: 'https://zhan-3.github.io',
  output: 'static',
  trailingSlash: 'always',
  markdown: { shikiConfig: { theme: 'github-light' } },
  devToolbar: { enabled: false },
});
