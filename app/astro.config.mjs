import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://prof-mo.site',
  server: { host: '127.0.0.1', port: 4321 },
  build: { format: 'directory' },

  vite: {
    plugins: [tailwindcss()],
  },
});