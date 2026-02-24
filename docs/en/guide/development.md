# Development Guide

This guide is for contributors who want to understand the project structure and develop the plugin locally.

## Project Structure

### Source Structure

```
packages/vitepress-plugin-mermaid-preview/
├── src/
│   ├── components/
│   │   ├── Mermaid.vue           # Diagram rendering component (Vue SFC)
│   │   └── MermaidPreview.vue    # Fullscreen preview component (Vue SFC)
│   ├── composables/
│   │   └── useMermaidPreview.ts  # Internal state management
│   ├── index.ts                  # Main entry, exports public features
│   ├── theme.ts                  # Theme configuration, one-click integration
│   └── mermaid-markdown.ts       # markdown-it plugin
├── dist/                         # Build output (included in publish)
│   ├── index.js                  # Main entry
│   ├── index.d.ts                # Type declarations
│   ├── theme.js                  # Theme configuration
│   ├── theme.d.ts                # Type declarations
│   ├── mermaid-markdown.js       # markdown-it plugin
│   ├── mermaid-markdown.d.ts     # Type declarations
│   ├── components/
│   │   ├── Mermaid.vue           # Vue SFC (copied)
│   │   └── MermaidPreview.vue    # Vue SFC (copied)
│   └── composables/
│       ├── useMermaidPreview.js  # Internal composable (not exported)
│       └── useMermaidPreview.d.ts # Type declarations
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Export Paths

| Import Path                                                        | Description                                       |
| ------------------------------------------------------------------ | ------------------------------------------------- |
| `@unify-js/vitepress-plugin-mermaid`                               | Main entry, exports `mermaidMarkdownPlugin`, etc. |
| `@unify-js/vitepress-plugin-mermaid/theme`                         | Theme configuration, recommended approach         |
| `@unify-js/vitepress-plugin-mermaid/mermaid-markdown`              | markdown-it plugin                                |
| `@unify-js/vitepress-plugin-mermaid/components/Mermaid.vue`        | Mermaid component (Vue SFC)                       |
| `@unify-js/vitepress-plugin-mermaid/components/MermaidPreview.vue` | Preview component (Vue SFC)                       |

## Local Development

### Setup

```bash
# Navigate to plugin directory
cd packages/vitepress-plugin-mermaid-preview

# Install dependencies
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
- Use named exports, default export is theme configuration
