# useMermaidPreview

A Vue composable for programmatic control of the Mermaid preview modal.

## Usage

```typescript
import { useMermaidPreview } from '@unify-js/vitepress-plugin-mermaid';

const { isOpen, svg, open, close } = useMermaidPreview();
```

## Returns

### `isOpen`

- **Type**: `ComputedRef<boolean>`
- **Description**: Indicates whether the preview modal is currently open

```typescript
// Check if preview is open
if (isOpen.value) {
  console.log('Preview is currently open');
}
```

### `svg`

- **Type**: `ComputedRef<string>`
- **Description**: The SVG content currently displayed in the preview

```typescript
// Get current SVG content
const currentSvg = svg.value;
```

### `open`

- **Type**: `(svgContent: string) => void`
- **Description**: Opens the preview modal with the specified SVG content

```typescript
// Open preview with SVG string
open('<svg>...</svg>');

// Or with a variable
const diagramSvg = '<svg><!-- diagram content --></svg>';
open(diagramSvg);
```

### `close`

- **Type**: `() => void`
- **Description**: Closes the preview modal

```typescript
// Close the preview
close();
```

## Complete Example

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useMermaidPreview } from '@unify-js/vitepress-plugin-mermaid';

const { isOpen, svg, open, close } = useMermaidPreview();
const customSvg = ref(`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="#bd34fe" />
    <text x="50" y="55" text-anchor="middle" fill="white">Hello</text>
  </svg>
`);

function showCustomDiagram() {
  open(customSvg.value);
}

function handleClose() {
  console.log('Preview closed, SVG was:', svg.value);
  close();
}
</script>

<template>
  <div>
    <button @click="showCustomDiagram">Show Custom Diagram</button>
    <p>Preview is {{ isOpen ? 'open' : 'closed' }}</p>
  </div>
</template>
```

## Reactive State

The composable uses a global state, meaning:

- Only one preview can be open at a time
- State is shared across all components
- Changes are reactive across the application

```vue
<script setup lang="ts">
// Component A
import { useMermaidPreview } from '@unify-js/vitepress-plugin-mermaid';
const { open } = useMermaidPreview();

function openFromA() {
  open('<svg>A</svg>');
}
</script>
```

```vue
<script setup lang="ts">
// Component B (elsewhere in the app)
import { useMermaidPreview } from '@unify-js/vitepress-plugin-mermaid';
const { isOpen, svg } = useMermaidPreview();

// These will react to changes from Component A
// isOpen and svg will update when Component A calls open()
</script>
```

## TypeScript Types

```typescript
interface UseMermaidPreviewReturn {
  isOpen: ComputedRef<boolean>;
  svg: ComputedRef<string>;
  open: (svgContent: string) => void;
  close: () => void;
}

declare function useMermaidPreview(): UseMermaidPreviewReturn;
```
