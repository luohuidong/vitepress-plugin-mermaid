# 开发指南

本指南面向希望了解项目结构并在本地开发插件的贡献者。

## 项目结构

### 源码结构

```
packages/vitepress-plugin-mermaid-preview/
├── src/
│   ├── components/
│   │   ├── Mermaid.vue           # 图表渲染组件 (Vue SFC)
│   │   └── MermaidPreview.vue    # 全屏预览组件 (Vue SFC)
│   ├── composables/
│   │   └── useMermaidPreview.ts  # 状态管理
│   ├── index.ts                  # 主入口，导出所有功能
│   ├── theme.ts                  # 主题配置，一键集成
│   └── mermaid-markdown.ts       # markdown-it 插件
├── dist/                         # 构建输出（包含在发布中）
│   ├── index.js                  # 主入口
│   ├── index.d.ts                # 类型声明
│   ├── theme.js                  # 主题配置
│   ├── theme.d.ts                # 类型声明
│   ├── mermaid-markdown.js       # markdown-it 插件
│   ├── mermaid-markdown.d.ts     # 类型声明
│   ├── components/
│   │   ├── Mermaid.vue           # Vue SFC (复制)
│   │   └── MermaidPreview.vue    # Vue SFC (复制)
│   └── composables/
│       ├── useMermaidPreview.js  # 编译后的 composable
│       └── useMermaidPreview.d.ts # 类型声明
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### 导出路径

| 导入路径                                                           | 描述                                    |
| ------------------------------------------------------------------ | --------------------------------------- |
| `@unify-js/vitepress-plugin-mermaid`                               | 主入口，导出 `mermaidMarkdownPlugin` 等 |
| `@unify-js/vitepress-plugin-mermaid/theme`                         | 主题配置，推荐方式                      |
| `@unify-js/vitepress-plugin-mermaid/mermaid-markdown`              | markdown-it 插件                        |
| `@unify-js/vitepress-plugin-mermaid/components/Mermaid.vue`        | Mermaid 组件 (Vue SFC)                  |
| `@unify-js/vitepress-plugin-mermaid/components/MermaidPreview.vue` | 预览组件 (Vue SFC)                      |
| `@unify-js/vitepress-plugin-mermaid/composables/useMermaidPreview` | 状态管理 composable                     |

## 本地开发

### 环境搭建

```bash
# 进入插件目录
cd packages/vitepress-plugin-mermaid-preview

# 安装依赖
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
