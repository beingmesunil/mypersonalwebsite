import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

import { SITE } from './src/constants/site';
import { ensureTrailingSlash } from './src/utils/url';
import { localPhotosPlugin } from './scripts/local-photos-plugin';
import { sitemapPlugin } from './scripts/sitemap-plugin';

/**
 * Derived from `SITE.url` so a single edit moves the site between a GitHub
 * Pages project sub-path and a custom domain at the root.
 */
const base = ensureTrailingSlash(new URL(SITE.url).pathname);

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), localPhotosPlugin(), sitemapPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        /** Split vendors so the framework and animation layers cache separately. */
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined;
          if (/framer-motion|motion-dom|motion-utils/.test(id)) return 'motion';
          if (/react-hook-form|@hookform|zod/.test(id)) return 'forms';
          if (/react-router|react-dom|scheduler|[\\/]react[\\/]/.test(id)) return 'react';
          return 'vendor';
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.{test,spec}.{ts,tsx}', 'src/test/**', 'src/main.tsx'],
    },
  },
});
