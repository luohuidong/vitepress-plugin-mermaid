import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import { enhanceAppWithMermaid } from '../../../src/theme';
import MermaidPreview from '../../../src/components/MermaidPreview.vue';

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    enhanceAppWithMermaid(ctx);
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(MermaidPreview)
    });
  }
} satisfies Theme;
