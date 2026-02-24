# API 参考

VitePress Mermaid 的完整 API 参考。

## 包导出

插件为不同的使用场景提供了多个入口点：

| 导入路径                                                           | 描述                             |
| ------------------------------------------------------------------ | -------------------------------- |
| `@unify-js/vitepress-plugin-mermaid`                               | 主入口，包含所有组合式函数和插件 |
| `@unify-js/vitepress-plugin-mermaid/theme`                         | 主题配置助手                     |
| `@unify-js/vitepress-plugin-mermaid/mermaid-markdown`              | Markdown-it 插件                 |
| `@unify-js/vitepress-plugin-mermaid/components/Mermaid.vue`        | Mermaid 组件                     |
| `@unify-js/vitepress-plugin-mermaid/components/MermaidPreview.vue` | 预览模态框组件                   |
| `@unify-js/vitepress-plugin-mermaid/composables/useMermaidPreview` | 状态组合式函数                   |

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

### `useMermaidPreview`

用于控制预览状态的组合式函数：

```typescript
import { useMermaidPreview } from '@unify-js/vitepress-plugin-mermaid';
```

## 模块

- [useMermaidPreview](./use-mermaid-preview.md) - 状态管理组合式函数
- [组件](./components.md) - Vue 组件参考
- [Markdown 插件](./markdown-plugin.md) - Markdown-it 插件详情
