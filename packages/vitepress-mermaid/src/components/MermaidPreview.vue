<template>
  <Teleport to="body">
    <div v-if="isOpen" class="mermaid-preview-overlay" @click="handleOverlayClick">
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
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useMermaidPreview } from './useMermaidPreview';

const { isOpen, svg, close } = useMermaidPreview();

// DOM 引用
const canvasRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const zoomTextRef = ref<HTMLElement>();

// 变换状态 (使用普通变量，避免 Vue 响应式开销)
let scale = 2;
let translateX = 0;
let translateY = 0;

// 拖拽状态
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let initialTranslateX = 0;
let initialTranslateY = 0;

// 配置
const MIN_SCALE = 0.1;
const MAX_SCALE = 10;
const ZOOM_STEP = 0.2;
const WHEEL_SENSITIVITY = 0.001;

// 直接应用变换到 DOM
function applyTransform() {
  const content = contentRef.value;
  if (!content) return;

  content.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

  // 更新缩放百分比显示
  if (zoomTextRef.value) {
    zoomTextRef.value.textContent = `${Math.round(scale * 100)}%`;
  }
}

// 缩放操作
function zoomIn() {
  scale = Math.min(scale * (1 + ZOOM_STEP), MAX_SCALE);
  applyTransform();
}

function zoomOut() {
  scale = Math.max(scale / (1 + ZOOM_STEP), MIN_SCALE);
  applyTransform();
}

function resetZoom() {
  scale = 2;
  translateX = 0;
  translateY = 0;
  applyTransform();
}

// 滚轮缩放
function handleWheel(e: WheelEvent) {
  e.preventDefault();

  const canvas = canvasRef.value;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // 鼠标相对于画布中心的位置
  const mouseX = e.clientX - centerX;
  const mouseY = e.clientY - centerY;

  // 计算新的缩放比例
  const delta = -e.deltaY * WHEEL_SENSITIVITY;
  const newScale = Math.min(Math.max(scale * (1 + delta), MIN_SCALE), MAX_SCALE);

  // 以鼠标位置为中心缩放
  const scaleRatio = newScale / scale;
  translateX = mouseX - (mouseX - translateX) * scaleRatio;
  translateY = mouseY - (mouseY - translateY) * scaleRatio;
  scale = newScale;

  applyTransform();
}

// 拖拽开始
function handleMouseDown(e: MouseEvent) {
  if (e.button !== 0) return;

  isDragging = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  initialTranslateX = translateX;
  initialTranslateY = translateY;

  // 添加拖拽时的样式
  const content = contentRef.value;
  if (content) {
    content.style.cursor = 'grabbing';
  }

  // 添加全局鼠标事件监听
  document.addEventListener('mousemove', handleGlobalMouseMove);
  document.addEventListener('mouseup', handleGlobalMouseUp);
}

// 拖拽移动 (全局)
function handleGlobalMouseMove(e: MouseEvent) {
  if (!isDragging) return;

  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;

  translateX = initialTranslateX + dx;
  translateY = initialTranslateY + dy;

  applyTransform();
}

// 拖拽结束 (全局)
function handleGlobalMouseUp() {
  if (!isDragging) return;
  isDragging = false;

  const content = contentRef.value;
  if (content) {
    content.style.cursor = 'grab';
  }

  // 清理全局事件
  document.removeEventListener('mousemove', handleGlobalMouseMove);
  document.removeEventListener('mouseup', handleGlobalMouseUp);
}

// 点击遮罩关闭
function handleOverlayClick() {
  close();
}

// 键盘事件
function handleKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return;

  switch (e.key) {
    case 'Escape':
      close();
      break;
    case '+':
    case '=':
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        zoomIn();
      }
      break;
    case '-':
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        zoomOut();
      }
      break;
    case '0':
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        resetZoom();
      }
      break;
  }
}

// 监听打开状态，重置变换
watch(
  () => isOpen.value,
  open => {
    if (open) {
      scale = 2;
      translateX = 0;
      translateY = 0;

      // 等待 DOM 更新后应用初始状态
      requestAnimationFrame(() => {
        const content = contentRef.value;
        if (content) {
          content.style.transformOrigin = 'center center';
          content.style.cursor = 'grab';
          applyTransform();
        }
      });
    }
  }
);

onMounted(() => {
  // 键盘事件
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  // 清理可能残留的全局鼠标事件
  document.removeEventListener('mousemove', handleGlobalMouseMove);
  document.removeEventListener('mouseup', handleGlobalMouseUp);
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
