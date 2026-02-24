import type { Theme, EnhanceAppContext } from 'vitepress';
import type { Component } from 'vue';

// 组件类型声明
export type MermaidComponent = Component;
export type MermaidPreviewComponent = Component;

/**
 * 增强应用配置，注册 Mermaid 组件
 * 在客户端调用，避免 SSR 问题
 */
export function enhanceAppWithMermaid({ app }: EnhanceAppContext): void {
  // 客户端动态导入，避免 SSR 时加载 CSS
  if (typeof window !== 'undefined') {
    import('./components/Mermaid.vue').then(module => {
      app.component('Mermaid', module.default);
    });
    import('./components/MermaidPreview.vue').then(module => {
      app.component('MermaidPreview', module.default);
    });
  }
}

// 为了兼容性，保留默认导出（空对象）
const mermaidPluginTheme: Theme = {};
export default mermaidPluginTheme;
