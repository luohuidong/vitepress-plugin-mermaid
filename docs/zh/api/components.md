# 组件

插件提供的 Vue 组件。

## Mermaid

从代码渲染 Mermaid 图表。

### 导入

```typescript
import Mermaid from '@unify-js/vitepress-plugin-mermaid/components/Mermaid.vue';
```

### 属性

| 属性   | 类型     | 必填 | 描述             |
| ------ | -------- | ---- | ---------------- |
| `code` | `string` | 是   | Mermaid 图表代码 |

### 用法

```vue
<script setup>
import Mermaid from '@unify-js/vitepress-plugin-mermaid/components/Mermaid.vue';

const diagramCode = `
graph TD
  A[开始] --> B[结束]
`;
</script>

<template>
  <Mermaid :code="diagramCode" />
</template>
```

### 功能

- 将 Mermaid 语法渲染为 SVG
- 自动处理预览点击事件
- 适配亮色/暗色主题
- 优雅地处理渲染错误

## MermaidPreview

全屏预览模态框组件。

### 导入

```typescript
import MermaidPreview from '@unify-js/vitepress-plugin-mermaid/components/MermaidPreview.vue';
```

### 用法

该组件通常通过主题全局注册：

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

### 功能

- 全屏模态框覆盖层
- 缩放控制（按钮、滚轮、键盘）
- 拖拽/平移功能
- 键盘快捷键（ESC、Ctrl+/-、Ctrl+0）
- 关闭按钮和背景点击
- 流畅动画
- 响应式设计

## 组件注册

### 全局注册（推荐）

```typescript
// .vitepress/theme/index.ts
import type { Theme } from 'vitepress';
import mermaidPluginTheme from '@unify-js/vitepress-plugin-mermaid/theme';

export default {
  extends: mermaidPluginTheme,
} satisfies Theme;
```

或手动：

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

### 本地使用

```vue
<script setup>
import Mermaid from '@unify-js/vitepress-plugin-mermaid/components/Mermaid.vue';
</script>

<template>
  <Mermaid code="graph TD; A-->B;" />
</template>
```

## TypeScript 支持

两个组件都包含 TypeScript 声明。对于 `.vue` 文件支持，请确保您有：

```typescript
// env.d.ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```
