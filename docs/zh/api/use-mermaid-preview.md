# useMermaidPreview

用于程序化控制 Mermaid 预览模态框的 Vue 组合式函数。

## 用法

```typescript
import { useMermaidPreview } from '@unify-js/vitepress-plugin-mermaid';

const { isOpen, svg, open, close } = useMermaidPreview();
```

## 返回值

### `isOpen`

- **类型**: `ComputedRef<boolean>`
- **描述**: 指示预览模态框当前是否打开

```typescript
// 检查预览是否打开
if (isOpen.value) {
  console.log('预览当前已打开');
}
```

### `svg`

- **类型**: `ComputedRef<string>`
- **描述**: 当前在预览中显示的 SVG 内容

```typescript
// 获取当前 SVG 内容
const currentSvg = svg.value;
```

### `open`

- **类型**: `(svgContent: string) => void`
- **描述**: 使用指定的 SVG 内容打开预览模态框

```typescript
// 使用 SVG 字符串打开预览
open('<svg>...</svg>');

// 或使用变量
const diagramSvg = '<svg><!-- 图表内容 --></svg>';
open(diagramSvg);
```

### `close`

- **类型**: `() => void`
- **描述**: 关闭预览模态框

```typescript
// 关闭预览
close();
```

## 完整示例

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useMermaidPreview } from '@unify-js/vitepress-plugin-mermaid';

const { isOpen, svg, open, close } = useMermaidPreview();
const customSvg = ref(`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="#bd34fe" />
    <text x="50" y="55" text-anchor="middle" fill="white">你好</text>
  </svg>
`);

function showCustomDiagram() {
  open(customSvg.value);
}

function handleClose() {
  console.log('预览已关闭，SVG 是:', svg.value);
  close();
}
</script>

<template>
  <div>
    <button @click="showCustomDiagram">显示自定义图表</button>
    <p>预览状态: {{ isOpen ? '打开' : '关闭' }}</p>
  </div>
</template>
```

## 响应式状态

该组合式函数使用全局状态，意味着：

- 一次只能打开一个预览
- 状态在所有组件间共享
- 更改在整个应用中都是响应式的

```vue
<script setup lang="ts">
// 组件 A
import { useMermaidPreview } from '@unify-js/vitepress-plugin-mermaid';
const { open } = useMermaidPreview();

function openFromA() {
  open('<svg>A</svg>');
}
</script>
```

```vue
<script setup lang="ts">
// 组件 B（应用中的其他地方）
import { useMermaidPreview } from '@unify-js/vitepress-plugin-mermaid';
const { isOpen, svg } = useMermaidPreview();

// 这些将对组件 A 的更改作出反应
// 当组件 A 调用 open() 时，isOpen 和 svg 会更新
</script>
```

## TypeScript 类型

```typescript
interface UseMermaidPreviewReturn {
  isOpen: ComputedRef<boolean>;
  svg: ComputedRef<string>;
  open: (svgContent: string) => void;
  close: () => void;
}

declare function useMermaidPreview(): UseMermaidPreviewReturn;
```
