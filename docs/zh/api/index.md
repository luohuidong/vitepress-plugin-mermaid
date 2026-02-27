# API 参考

VitePress Mermaid 的完整 API 参考。

## 包导出

所有 API 都从主入口 `@unify-js/vitepress-plugin-mermaid` 导出：

```typescript
// 默认导出：主题配置
import mermaidPluginTheme from '@unify-js/vitepress-plugin-mermaid';

// 命名导出
import {
  mermaidMarkdownPlugin, // Markdown-it 插件
  Mermaid, // 图表组件
  MermaidPreview, // 预览弹窗组件
} from '@unify-js/vitepress-plugin-mermaid';
```

## 主要导出

### `mermaidPluginTheme`

用于轻松集成的默认主题导出：

```typescript
import mermaidPluginTheme from '@unify-js/vitepress-plugin-mermaid/theme';
```

### `mermaidMarkdownPlugin`

用于处理 Mermaid 代码块的 Markdown-it 插件：

```typescript
import { mermaidMarkdownPlugin } from '@unify-js/vitepress-plugin-mermaid';
```

### `enhanceAppWithMermaid`

在主题中注册组件的辅助函数：

```typescript
import { enhanceAppWithMermaid } from '@unify-js/vitepress-plugin-mermaid';
```

## 模块

- [组件](./components.md) - Vue 组件参考
- [Markdown 插件](./markdown-plugin.md) - Markdown-it 插件详情
