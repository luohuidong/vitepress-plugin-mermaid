# Development Guide

This guide is for contributors who want to understand the project structure and develop the plugin locally.

## Project Structure

### Source Structure

```
packages/vitepress-mermaid/src/
├── components/
│   ├── index.ts             # Component barrel exports
│   ├── Mermaid.vue           # Diagram rendering component (Vue SFC)
│   ├── MermaidPreview/        # Fullscreen preview module
│   │   ├── index.vue          # Preview overlay component
│   │   ├── useCanvasTransform.ts  # Zoom/pan/drag logic
│   │   └── usePreviewKeyboard.ts  # Keyboard shortcuts
│   ├── useMermaidPreview.ts  # Internal state management
│   └── Layout.vue            # Layout component with preview slot
├── index.ts                  # Browser entry, exports MermaidTheme
├── config.ts                 # Node.js entry, exports withMermaidConfig
├── mermaid-markdown.ts       # markdown-it plugin implementation
└── env.d.ts                  # Type declarations for build/dev environment
```

### Build Output

The build uses Vite with library mode:

```
dist/
├── index.js      # Browser entry bundle
├── config.js     # Node.js config entry bundle
├── index.d.ts    # Type declarations for browser entry
└── config.d.ts   # Type declarations for config entry
```

Build output is split into browser and Node.js entries, with external dependencies (vitepress, mermaid, vue).

### Exports

Public APIs are exported from two entry points:

```typescript
// Browser entry (theme)
import { MermaidTheme } from '@unify-js/vitepress-mermaid';

// Node.js entry (VitePress config)
import { withMermaidConfig } from '@unify-js/vitepress-mermaid/config';
```

## Important: Import Path Separation

VitePress Mermaid provides two separate entry points for different environments:

### Config Entry (Node.js)

For VitePress config file (`.vitepress/config.ts`), import from `/config`:

```typescript
import { withMermaidConfig } from '@unify-js/vitepress-mermaid/config';
```

- `withMermaidConfig` must be imported from `@unify-js/vitepress-mermaid/config`

### Theme Entry (Browser)

For theme file (`.vitepress/theme/index.ts`), import from the root:

```typescript
import { MermaidTheme } from '@unify-js/vitepress-mermaid';
```

::: warning Why Separate Imports?
The config runs in Node.js and the theme runs in the browser. The theme imports `vitepress/theme` which contains browser-specific code (CSS, fonts). If imported together, Node.js will fail to resolve these browser modules when loading the config.
:::

## Local Development

### Setup

```bash
# Navigate to plugin directory
cd packages/vitepress-mermaid

# Install dependencies (from monorepo root)
pnpm install

# Development mode (watch file changes)
pnpm dev

# Build
pnpm build
```

### Debugging in Documentation Site

```bash
pnpm docs:dev
```

## Code Standards

- Write code using TypeScript
- Components use `<script setup>` syntax
- Styles use scoped CSS
- Use named exports for public APIs
