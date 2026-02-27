# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev              # Build library in watch mode (vite build --watch)
pnpm docs:dev         # Start docs dev server

# Build
pnpm build            # Build library for production (vite + vue-tsc for types)
pnpm docs:build       # Build documentation site

# Code Quality
pnpm format           # Format all files with Prettier
pnpm format:check     # Check formatting
```

## Architecture

This is a VitePress plugin that adds fullscreen preview functionality for Mermaid diagrams. The plugin consists of:

### Core Components

**Mermaid.vue** - Renders diagrams from markdown code blocks. Uses mermaid.js for rendering, supports dark/light theme switching, and emits click events to open preview.

**MermaidPreview.vue** - Fullscreen overlay with zoom/pan controls. Uses direct DOM manipulation for smooth interactions (avoiding Vue reactivity overhead). Teleports to body for proper layering.

**useMermaidPreview.ts** - Internal global state management using a singleton pattern. Provides `open(svg)`, `close()`, and reactive `isOpen`/`svg` properties. Used internally by Mermaid and MermaidPreview components, not exported to users.

**mermaid-markdown.ts** - Markdown-it plugin that transforms `mermaid` and `mermaid-example` code blocks into Vue `<Mermaid>` components wrapped in `<Suspense>`.

**theme.ts** - Theme integration helper with `enhanceAppWithMermaid()` function. Uses client-side dynamic imports to avoid SSR issues with mermaid.js.

### Build System

The build uses Vite with library mode:

1. `vite build` compiles all source files (TypeScript and Vue SFCs) into a single `dist/index.js`
2. `vue-tsc --emitDeclarationOnly` generates `.d.ts` type declarations

All components and logic are bundled into a single ESM output with external dependencies (vitepress, mermaid, vue).

### Key Patterns

- **SSR Safety:** All mermaid-related code uses dynamic imports gated by `typeof window !== 'undefined'` checks
- **Client-side only:** Mermaid rendering only happens in the browser, not during SSR
- **State Management:** Simple shared state pattern using Vue's reactivity system (no Pinia/Vuex)
- **Component Distribution:** All components are bundled by Vite into a single ESM module

### Project Structure

```
src/
├── components/          # Vue SFCs (bundled by Vite)
│   ├── Mermaid.vue
│   ├── MermaidPreview.vue
│   └── useMermaidPreview.ts  # Internal state management
├── index.ts            # Main exports
├── theme.ts            # Theme integration
└── mermaid-markdown.ts # Markdown-it plugin

docs/                   # VitePress documentation site
├── .vitepress/
│   ├── config.ts       # Site config with i18n (en/zh)
│   └── theme/index.ts
├── en/                 # English docs
└── zh/                 # Chinese docs
```

### Peer Dependencies

The plugin requires these to be installed by the consumer:

- `vitepress`: ^1.0.0
- `mermaid`: ^11.0.0
- `vue`: ^3.0.0 (via VitePress)

### Code Style

**Formatting Rule:** After modifying any code, format only the changed files with Prettier:

```bash
pnpm prettier --write <changed-files>
```

Prettier configuration (from `.prettierrc`):

- Semi: true
- Single quotes: true
- Tab width: 2
- Trailing comma: es5
- Print width: 100

### Documentation Maintenance

**After changing code logic, check if documentation updates are needed:**

- Update `README.md` if the changes affect public API or usage instructions
- Update `docs/` directory if the changes affect:
  - Configuration options (`docs/[lang]/guide/configuration.md`)
  - Usage instructions (`docs/[lang]/guide/usage.md`, `docs/[lang]/guide/getting-started.md`)
  - Development guidelines (`docs/[lang]/guide/development.md`)
  - API documentation (`docs/[lang]/api/`)
- Ensure both English (`docs/en/`) and Chinese (`docs/zh/`) docs are updated
