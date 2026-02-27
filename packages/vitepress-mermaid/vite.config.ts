import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: [
        'vitepress',
        'mermaid',
        'vue',
        /^vitepress\//,
        '@localSearchIndex',
        '@themeConfig',
        '@siteData',
      ],
      output: {
        preserveModules: false,
      },
    },
  },
});
