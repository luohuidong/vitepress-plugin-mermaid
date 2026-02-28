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

**MermaidPreview/** - Fullscreen preview module, organized as a directory:

- **index.vue** - Overlay component with toolbar, canvas, and hint. Teleports to body for proper layering. Delegates zoom/pan logic to composables below.
- **useCanvasTransform.ts** - Zoom, pan, and drag interactions via direct DOM manipulation (avoids Vue reactivity overhead for high-frequency updates).
- **usePreviewKeyboard.ts** - Keyboard shortcuts (ESC close, Ctrl+/-/0 zoom). Auto-manages event listener lifecycle.

**useMermaidPreview.ts** - Internal global state management using a singleton pattern. Provides `open(svg)`, `close()`, and reactive `isOpen`/`svg` properties. Used internally by Mermaid and MermaidPreview components, not exported to users.

**mermaid-markdown.ts** - Markdown-it plugin that transforms `mermaid` and `mermaid-example` code blocks into Vue `<Mermaid>` components wrapped in `<Suspense>`.

**theme.ts** - Theme integration helper with `enhanceAppWithMermaid()` function. Uses client-side dynamic imports to avoid SSR issues with mermaid.js.

### Build System

The build uses Vite with library mode and multiple entry points:

1. `vite build` compiles source files into two separate bundles:
   - `dist/index.js` - Theme components (browser-only, CSS auto-injected)
   - `dist/config.js` - Config helpers (Node.js-only)
2. `vue-tsc --emitDeclarationOnly` generates `.d.ts` type declarations

**CSS Injection:** Uses `vite-plugin-css-injected-by-js` to automatically inject CSS into the page when the theme is imported. Users don't need to manually import CSS files.

**Why separate entry points?** The config runs in Node.js and theme runs in the browser. The theme imports `vitepress/theme` which contains browser-specific code (CSS, fonts). Keeping them separate prevents module resolution errors when loading the config.

### Key Patterns

- **SSR Safety:** All mermaid-related code uses dynamic imports gated by `typeof window !== 'undefined'` checks
- **Client-side only:** Mermaid rendering only happens in the browser, not during SSR
- **State Management:** Simple shared state pattern using Vue's reactivity system (no Pinia/Vuex)
- **Component Distribution:** All components are bundled by Vite into a single ESM module

### Project Structure

Monorepo managed with pnpm workspaces:

```
packages/vitepress-mermaid/     # Main plugin package
├── src/
│   ├── components/              # Vue SFCs (bundled by Vite)
│   │   ├── Mermaid.vue
│   │   ├── MermaidPreview/
│   │   │   ├── index.vue
│   │   │   ├── useCanvasTransform.ts
│   │   │   └── usePreviewKeyboard.ts
│   │   └── useMermaidPreview.ts
│   ├── index.ts                 # Main exports
│   ├── theme.ts                 # Theme integration
│   └── mermaid-markdown.ts      # Markdown-it plugin
├── package.json
├── tsconfig.json
└── vite.config.ts

docs/                           # VitePress documentation site (separate package)
├── .vitepress/
│   ├── config.ts               # Site config with i18n (en/zh)
│   └── theme/index.ts
├── package.json
├── en/                         # English docs
└── zh/                         # Chinese docs

package.json                    # Root monorepo config (scripts only)
pnpm-workspace.yaml             # Workspace definition
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
