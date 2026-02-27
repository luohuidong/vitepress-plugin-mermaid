# API Reference

Complete API reference for VitePress Mermaid.

## Package Exports

All APIs are exported from the main entry point `@unify-js/vitepress-plugin-mermaid`:

```typescript
// Default export: theme configuration
import mermaidPluginTheme from '@unify-js/vitepress-plugin-mermaid';

// Named exports
import {
  mermaidMarkdownPlugin, // Markdown-it plugin
  Mermaid, // Diagram component
  MermaidPreview, // Preview modal component
} from '@unify-js/vitepress-plugin-mermaid';
```

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
