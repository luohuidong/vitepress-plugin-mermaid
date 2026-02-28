# 开发指南

本指南面向希望了解项目结构并在本地开发插件的贡献者。

## 项目结构

### 源码结构

```
packages/vitepress-mermaid/src/
├── components/
│   ├── index.ts             # 组件统一导出
│   ├── Mermaid.vue           # 图表渲染组件 (Vue SFC)
│   ├── MermaidPreview/        # 全屏预览模块
│   │   ├── index.vue          # 预览弹层组件
│   │   ├── useCanvasTransform.ts  # 缩放/平移/拖拽逻辑
│   │   └── usePreviewKeyboard.ts  # 键盘快捷键
│   ├── useMermaidPreview.ts  # 内部状态管理
│   └── Layout.vue            # 布局组件（包含预览插槽）
├── index.ts                  # 浏览器入口，导出 MermaidTheme
├── config.ts                 # Node.js 入口，导出 withMermaidConfig
├── mermaid-markdown.ts       # markdown-it 插件实现
└── env.d.ts                  # 构建/开发环境类型声明
```

### 构建输出

构建使用 Vite 的库模式：

```
dist/
├── index.js      # 浏览器入口打包产物
├── config.js     # Node.js 配置入口打包产物
├── index.d.ts    # 浏览器入口类型声明
└── config.d.ts   # 配置入口类型声明
```

构建产物按浏览器入口与 Node.js 入口拆分，外部依赖（vitepress、mermaid、vue）保持外部化。

### 导出内容

公共 API 通过两个入口导出：

```typescript
// 浏览器入口（主题）
import { MermaidTheme } from '@unify-js/vitepress-mermaid';

// Node.js 入口（VitePress 配置）
import { withMermaidConfig } from '@unify-js/vitepress-mermaid/config';
```

## 重要：导入路径分离

VitePress Mermaid 为不同环境提供两个独立的入口点：

### 配置入口（Node.js）

对于 VitePress 配置文件（`.vitepress/config.ts`），从 `/config` 导入：

```typescript
import { withMermaidConfig } from '@unify-js/vitepress-mermaid/config';
```

- `withMermaidConfig` 必须从 `@unify-js/vitepress-mermaid/config` 导入

### 主题入口（浏览器）

对于主题文件（`.vitepress/theme/index.ts`），从根包导入：

```typescript
import { MermaidTheme } from '@unify-js/vitepress-mermaid';
```

::: warning 为什么要分开导入？
配置在 Node.js 中运行，主题在浏览器中运行。主题会导入 `vitepress/theme`，其中包含浏览器专用代码（CSS、字体）。如果一起导入，Node.js 在加载配置时将无法解析这些浏览器模块。
:::

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
- 对外公共 API 使用命名导出
