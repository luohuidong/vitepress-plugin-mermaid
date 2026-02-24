// Markdown plugin
export { mermaidMarkdownPlugin } from './mermaid-markdown';

// Theme helper
export { default as mermaidPluginTheme } from './theme';
export { default } from './theme';

// Note: Vue components (Mermaid.vue, MermaidPreview.vue) are not bundled.
// They are copied as-is to dist/components/ and should be imported directly:
//   import Mermaid from '@unify-js/vitepress-plugin-mermaid/components/Mermaid.vue'
