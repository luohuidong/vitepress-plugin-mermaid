import type { MarkdownRenderer } from 'vitepress';

/**
 * Mermaid markdown-it 插件
 * 将 mermaid 代码块转换为 Mermaid 组件
 */
export const mermaidMarkdownPlugin = (md: MarkdownRenderer) => {
  const defaultRenderer = md.renderer.rules.fence;

  if (!defaultRenderer) {
    throw new Error('defaultRenderer is undefined');
  }

  md.renderer.rules.fence = (tokens, index, options, env, slf) => {
    const token = tokens[index];
    const language = token.info.trim();

    // 处理 mermaid 代码块
    if (language.startsWith('mermaid')) {
      const key = `mermaid-${index}`;
      const showCode = language === 'mermaid-example';
      const graph = encodeURIComponent(token.content);

      return `<Mermaid id="${key}" :showCode="${showCode}" graph="${graph}" />`;
    }

    // 其他代码块使用默认渲染
    return defaultRenderer(tokens, index, options, env, slf);
  };
};
