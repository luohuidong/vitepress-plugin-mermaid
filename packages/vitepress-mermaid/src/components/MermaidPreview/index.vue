<template>
  <Teleport to="body">
    <div v-if="isOpen" class="mermaid-preview-overlay" @click="close">
      <div class="mermaid-preview-container" @click.stop>
        <!-- Toolbar -->
        <div class="mermaid-preview-toolbar">
          <div class="toolbar-left">
            <span class="zoom-text" ref="zoomTextRef">100%</span>
          </div>
          <div class="toolbar-center">
            <button class="toolbar-btn" title="Zoom out" @click="zoomOut">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M19 13H5v-2h14v2z" />
              </svg>
            </button>
            <button class="toolbar-btn" title="Reset" @click="resetZoom">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
                />
              </svg>
            </button>
            <button class="toolbar-btn" title="Zoom in" @click="zoomIn">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
          </div>
          <div class="toolbar-right">
            <button class="toolbar-btn close-btn" title="Close (ESC)" @click="close">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Diagram container -->
        <div
          ref="canvasRef"
          class="mermaid-preview-canvas"
          @wheel="handleWheel"
          @mousedown="handleMouseDown"
        >
          <div ref="contentRef" class="mermaid-preview-content" v-html="svg" />
        </div>

        <!-- Hint text -->
        <div class="mermaid-preview-hint">Scroll to zoom · Drag to pan · ESC to close</div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue';
import { useMermaidPreview } from '../useMermaidPreview';
import { useCanvasTransform } from './useCanvasTransform';
import { usePreviewKeyboard } from './usePreviewKeyboard';

const { isOpen, svg, close } = useMermaidPreview();

const {
  canvasRef,
  contentRef,
  zoomTextRef,
  zoomIn,
  zoomOut,
  resetZoom,
  handleWheel,
  handleMouseDown,
  initTransform,
  cleanup,
} = useCanvasTransform();

usePreviewKeyboard({
  isOpen,
  onClose: close,
  onZoomIn: zoomIn,
  onZoomOut: zoomOut,
  onResetZoom: resetZoom,
});

// Reset transform when preview opens
watch(
  () => isOpen.value,
  open => {
    if (open) {
      initTransform();
    }
  }
);

onUnmounted(() => {
  cleanup();
});
</script>

<style scoped>
.mermaid-preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mermaid-preview-container {
  width: 95vw;
  height: 95vh;
  background-color: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.mermaid-preview-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.toolbar-left,
.toolbar-center,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.zoom-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  min-width: 50px;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.toolbar-btn:hover:not(:disabled) {
  background-color: var(--vp-c-bg-elv);
}

.toolbar-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.close-btn:hover {
  background-color: var(--vp-c-danger-soft) !important;
  color: var(--vp-c-danger-1);
}

.mermaid-preview-canvas {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: var(--vp-c-bg);
  background-image: radial-gradient(circle, var(--vp-c-divider) 1px, transparent 1px);
  background-size: 20px 20px;
}

.mermaid-preview-content {
  /* 注意：不要添加 will-change: transform，会导致 SVG 放大时模糊 */
}

.mermaid-preview-content :deep(svg) {
  max-width: none;
  max-height: none;
  display: block;
}

.mermaid-preview-hint {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 12px;
  border-radius: 20px;
  pointer-events: none;
  opacity: 0.8;
}

/* 响应式 */
@media (max-width: 768px) {
  .mermaid-preview-container {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }

  .toolbar-center {
    position: static;
    transform: none;
  }

  .mermaid-preview-hint {
    display: none;
  }
}
</style>
