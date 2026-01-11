import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dhruvkaran.com',
  output: 'static',
  image: {
    // Enable Sharp for image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  vite: {
    build: {
      // Enable CSS code splitting for better caching
      cssCodeSplit: true,
      // Optimize chunk size
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  }
});
