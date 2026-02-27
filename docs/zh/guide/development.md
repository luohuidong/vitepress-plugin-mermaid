# 开发指南

本指南面向希望了解项目结构并在本地开发插件的贡献者。

## 项目结构

### 源码结构

```
packages/vitepress-mermaid/src/
├── components/
│   ├── Mermaid.vue           # 图表渲染组件 (Vue SFC)
│   ├── MermaidPreview.vue    # 全屏预览组件 (Vue SFC)
│   ├── useMermaidPreview.ts  # 内部状态管理
│   └── Layout.vue            # 布局组件（包含预览插槽）
├── index.ts                  # 主入口，导出所有功能
├── theme.ts                  # 主题配置，一键集成
└── mermaid-markdown.ts       # markdown-it 插件
```

### 构建输出

构建使用 Vite 的库模式：

```
dist/
├── index.js      # 打包后的 ESM 输出（包含所有组件和逻辑）
└── index.d.ts    # 类型声明（由 vue-tsc 生成）
```

所有组件和逻辑都被打包到单个 ESM 文件中，外部依赖（vitepress、mermaid、vue）保持外部化。

### 导出内容

所有公共 API 都从主入口 `@unify-js/vitepress-plugin-mermaid` 导出：

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

## 本地开发

### 环境搭建

```bash
# 进入插件目录
cd packages/vitepress-mermaid

# 安装依赖（从 monorepo 根目录）
pnpm install

# 开发模式（监听文件变更）
pnpm dev

# 构建
pnpm build
```

### 在文档站点中调试

```bash
pnpm docs:dev
```

## 代码规范

- 使用 TypeScript 编写代码
- 组件使用 `<script setup>` 语法
- 样式使用 scoped CSS
- 使用命名导出，默认导出为主题配置
