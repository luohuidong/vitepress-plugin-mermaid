# Components

Vue components provided by the plugin.

## Mermaid

Renders a Mermaid diagram from code.

### Import

```typescript
import Mermaid from '@unify-js/vitepress-plugin-mermaid/components/Mermaid.vue';
```

### Props

| Prop   | Type     | Required | Description              |
| ------ | -------- | -------- | ------------------------ |
| `code` | `string` | Yes      | The Mermaid diagram code |

### Usage

```vue
<script setup>
import Mermaid from '@unify-js/vitepress-plugin-mermaid/components/Mermaid.vue';

const diagramCode = `
graph TD
  A[Start] --> B[End]
`;
</script>

<template>
  <Mermaid :code="diagramCode" />
</template>
```

### Features

- Renders Mermaid syntax to SVG
- Automatically handles click events for preview
- Adapts to light/dark theme
- Handles rendering errors gracefully

## MermaidPreview

The fullscreen preview modal component.

### Import

```typescript
import MermaidPreview from '@unify-js/vitepress-plugin-mermaid/components/MermaidPreview.vue';
```

### Usage

This component is typically registered globally via the theme:

```typescript
// .vitepress/theme/index.ts
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import MermaidPreview from '@unify-js/vitepress-plugin-mermaid/components/MermaidPreview.vue';

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(MermaidPreview),
    });
  },
} satisfies Theme;
```

### Features

- Fullscreen modal overlay
- Zoom controls (buttons, wheel, keyboard)
- Pan/drag functionality
- Keyboard shortcuts (ESC, Ctrl+/-, Ctrl+0)
- Close button and backdrop click
- Smooth animations
- Responsive design

## Component Registration

### Global Registration (Recommended)

```typescript
// .vitepress/theme/index.ts
import type { Theme } from 'vitepress';
import mermaidPluginTheme from '@unify-js/vitepress-plugin-mermaid/theme';

export default {
  extends: mermaidPluginTheme,
} satisfies Theme;
```

Or manually:

```typescript
// .vitepress/theme/index.ts
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Mermaid from '@unify-js/vitepress-plugin-mermaid/components/Mermaid.vue';
import MermaidPreview from '@unify-js/vitepress-plugin-mermaid/components/MermaidPreview.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Mermaid', Mermaid);
    app.component('MermaidPreview', MermaidPreview);
  },
} satisfies Theme;
```

### Local Usage

```vue
<script setup>
import Mermaid from '@unify-js/vitepress-plugin-mermaid/components/Mermaid.vue';
</script>

<template>
  <Mermaid code="graph TD; A-->B;" />
</template>
```

## TypeScript Support

Both components include TypeScript declarations. For `.vue` file support, ensure you have:

```typescript
// env.d.ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```
