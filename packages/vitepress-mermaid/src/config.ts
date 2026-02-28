import type { UserConfig } from 'vitepress';
import { mermaidMarkdownPlugin } from './mermaid-markdown';

export function withMermaidConfig(config: UserConfig): UserConfig {
  return {
    ...config,
    markdown: {
      config: md => {
        mermaidMarkdownPlugin(md);
        config.markdown?.config?.(md);
      },
    },
  };
}
