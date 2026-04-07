import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
      components: fileURLToPath(new URL('./src/components', import.meta.url)),
      pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
      services: fileURLToPath(new URL('./src/services', import.meta.url)),
      themes: fileURLToPath(new URL('./src/themes', import.meta.url)),
      ts: fileURLToPath(new URL('./src/ts', import.meta.url)),
      utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
  base: '/games',
});
