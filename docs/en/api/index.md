# API Reference

Complete API reference for VitePress Mermaid.

## Package Exports

The plugin provides multiple entry points for different use cases:

| Import Path                                                        | Description                                 |
| ------------------------------------------------------------------ | ------------------------------------------- |
| `@unify-js/vitepress-plugin-mermaid`                               | Main entry with all composables and plugins |
| `@unify-js/vitepress-plugin-mermaid/theme`                         | Theme configuration helper                  |
| `@unify-js/vitepress-plugin-mermaid/mermaid-markdown`              | Markdown-it plugin                          |
| `@unify-js/vitepress-plugin-mermaid/components/Mermaid.vue`        | Mermaid component                           |
| `@unify-js/vitepress-plugin-mermaid/components/MermaidPreview.vue` | Preview modal component                     |

## Main Exports

### `mermaidPluginTheme`

Default theme export for easy integration:

```typescript
import mermaidPluginTheme from '@unify-js/vitepress-plugin-mermaid/theme';
```

### `mermaidMarkdownPlugin`

Markdown-it plugin for processing Mermaid code blocks:

```typescript
import { mermaidMarkdownPlugin } from '@unify-js/vitepress-plugin-mermaid';
```

### `enhanceAppWithMermaid`

Helper function to register components in your theme:

```typescript
import { enhanceAppWithMermaid } from '@unify-js/vitepress-plugin-mermaid';
```

## Modules

- [Components](./components.md) - Vue component references
- [Markdown Plugin](./markdown-plugin.md) - Markdown-it plugin details
