import { onMounted, onUnmounted } from 'vue';
import type { ComputedRef } from 'vue';

export interface PreviewKeyboardOptions {
  /** Reactive flag — shortcuts are only active when this is true */
  isOpen: ComputedRef<boolean>;
  onClose: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

/**
 * Keyboard shortcuts for the preview overlay.
 *
 * Registers a global `keydown` listener on mount and removes it on unmount.
 *
 * Supported shortcuts:
 * - `Escape` → close
 * - `Ctrl/Cmd + =` / `Ctrl/Cmd + +` → zoom in
 * - `Ctrl/Cmd + -` → zoom out
 * - `Ctrl/Cmd + 0` → reset zoom
 */
export function usePreviewKeyboard(options: PreviewKeyboardOptions) {
  const { isOpen, onClose, onZoomIn, onZoomOut, onResetZoom } = options;

  function handleKeydown(e: KeyboardEvent) {
    if (!isOpen.value) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case '+':
      case '=':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          onZoomIn();
        }
        break;
      case '-':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          onZoomOut();
        }
        break;
      case '0':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          onResetZoom();
        }
        break;
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
  });
}
