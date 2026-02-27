import { defineConfig } from 'vitepress';
import { mermaidMarkdownPlugin } from '../../src/';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'VitePress Mermaid',
  description:
    'VitePress plugin for Mermaid diagram preview with fullscreen, zoom, and pan support',

  rewrites: {
    'en/:pages*': ':pages*',
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  themeConfig: {
    logo: '/logo.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/unify-js/vitepress-plugin-mermaid-preview' },
    ],

    search: {
      provider: 'local',
    },
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide/getting-started' },
          { text: 'API', link: '/api/' },
          { text: 'Examples', link: '/examples/' },
        ],
        sidebar: {
          '/guide/': {
            base: '/guide/',
            items: [
              { text: 'What is VitePress Mermaid?', link: 'what-is-vitepress-mermaid' },
              { text: 'Getting Started', link: 'getting-started' },
              { text: 'Configuration', link: 'configuration' },
              { text: 'Usage', link: 'usage' },
              { text: 'Shortcuts', link: 'shortcuts' },
              { text: 'Development', link: 'development' },
            ],
          },
          '/api/': {
            base: '/api/',
            items: [
              { text: 'Overview', link: 'index' },
              { text: 'Components', link: 'components' },
              { text: 'Markdown Plugin', link: 'markdown-plugin' },
            ],
          },
          '/examples/': {
            base: '/examples/',
            items: [
              { text: 'Overview', link: 'index' },
              { text: 'Flowchart', link: 'flowchart' },
              { text: 'Sequence Diagram', link: 'sequence-diagram' },
              { text: 'Class Diagram', link: 'class-diagram' },
              { text: 'ER Diagram', link: 'er-diagram' },
              { text: 'Gantt Chart', link: 'gantt-chart' },
            ],
          },
        },
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2025-present Huidong Luo',
        },
        editLink: {
          pattern:
            'https://github.com/unify-js/vitepress-plugin-mermaid-preview/edit/main/docs/:path',
          text: 'Edit this page on GitHub',
        },
        docFooter: {
          prev: 'Previous page',
          next: 'Next page',
        },
        outline: {
          label: 'On this page',
        },
        lastUpdated: {
          text: 'Last updated',
        },
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Return to top',
        langMenuLabel: 'Change language',
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/guide/getting-started' },
          { text: 'API', link: '/zh/api/' },
          { text: '示例', link: '/zh/examples/' },
        ],
        sidebar: {
          '/zh/guide/': {
            base: '/zh/guide/',
            items: [
              { text: '什么是 VitePress Mermaid？', link: 'what-is-vitepress-mermaid' },
              { text: '快速开始', link: 'getting-started' },
              { text: '配置', link: 'configuration' },
              { text: '使用', link: 'usage' },
              { text: '快捷键', link: 'shortcuts' },
              { text: '开发指南', link: 'development' },
            ],
          },
          '/zh/api/': {
            base: '/zh/api/',
            items: [
              { text: '概览', link: 'index' },
              { text: '组件', link: 'components' },
              { text: 'Markdown 插件', link: 'markdown-plugin' },
            ],
          },
          '/zh/examples/': {
            base: '/zh/examples/',
            items: [
              { text: '概览', link: 'index' },
              { text: '流程图', link: 'flowchart' },
              { text: '时序图', link: 'sequence-diagram' },
              { text: '类图', link: 'class-diagram' },
              { text: 'ER 图', link: 'er-diagram' },
              { text: '甘特图', link: 'gantt-chart' },
            ],
          },
        },
        footer: {
          message: '基于 MIT 许可证发布。',
          copyright: 'Copyright © 2025-present Huidong Luo',
        },
        editLink: {
          pattern:
            'https://github.com/unify-js/vitepress-plugin-mermaid-preview/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页面',
        },
        docFooter: {
          prev: '上一页',
          next: '下一页',
        },
        outline: {
          label: '本页内容',
        },
        lastUpdated: {
          text: '最后更新于',
        },
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色主题',
        darkModeSwitchTitle: '切换到深色主题',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        langMenuLabel: '切换语言',
      },
    },
  },

  markdown: {
    config: md => {
      mermaidMarkdownPlugin(md);
    },
  },
});
