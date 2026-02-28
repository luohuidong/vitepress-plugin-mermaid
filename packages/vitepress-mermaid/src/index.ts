import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import { Layout, Mermaid, MermaidPreview } from './components';

export const MermaidTheme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Mermaid', Mermaid);
    app.component('MermaidPreview', MermaidPreview);
  },
} satisfies Theme;
