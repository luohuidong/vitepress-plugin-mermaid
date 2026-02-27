import { ref, computed } from 'vue';

interface PreviewState {
  isOpen: boolean;
  svg: string;
}

const state = ref<PreviewState>({
  isOpen: false,
  svg: '',
});

/**
 * Mermaid 预览状态管理
 * 用于在全屏预览组件和 Mermaid 组件之间共享状态
 */
export function useMermaidPreview() {
  /**
   * 打开预览
   * @param svgContent - 要预览的 SVG 内容
   */
  const open = (svgContent: string) => {
    state.value.svg = svgContent;
    state.value.isOpen = true;
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
  };

  /**
   * 关闭预览
   */
  const close = () => {
    state.value.isOpen = false;
    state.value.svg = '';
    // 恢复背景滚动
    document.body.style.overflow = '';
  };

  return {
    isOpen: computed(() => state.value.isOpen),
    svg: computed(() => state.value.svg),
    open,
    close,
  };
}

export default useMermaidPreview;
