import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dhruvkaran.com',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
