import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';

// 递归复制目录的函数
function copyDir(src: string, dest: string, filter?: (entry: string) => boolean) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src);

  for (const entry of entries) {
    const srcPath = resolve(src, entry);
    const destPath = resolve(dest, entry);
    const stat = statSync(srcPath);

    if (stat.isDirectory()) {
      copyDir(srcPath, destPath, filter);
    } else if (!filter || filter(entry)) {
      copyFileSync(srcPath, destPath);
    }
  }
}

export default defineConfig({
  build: {
    emptyOutDir: false, // 不清理输出目录，保留 tsc 生成的 .d.ts 文件
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        theme: resolve(__dirname, 'src/theme.ts'),
        'mermaid-markdown': resolve(__dirname, 'src/mermaid-markdown.ts')
      },
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'vue',
        'vitepress',
        'mermaid',
        /^vitepress\/.*/,
        /\.vue$/ // 将所有 .vue 文件视为外部依赖，不打包
      ]
    }
  },
  plugins: [
    {
      name: 'copy-vue-files',
      closeBundle() {
        // 构建完成后复制 .vue 文件
        // composables 由 tsc 编译，不需要复制
        copyDir(
          resolve(__dirname, 'src/components'),
          resolve(__dirname, 'dist/components'),
          entry => entry.endsWith('.vue')
        );
        console.log('✓ Copied .vue files to dist/');
      }
    }
  ]
});
