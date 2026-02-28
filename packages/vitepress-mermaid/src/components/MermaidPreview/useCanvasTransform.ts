import { ref } from 'vue';

export interface CanvasTransformOptions {
  /** Initial scale factor (default: 2) */
  initialScale?: number;
  /** Minimum scale limit (default: 0.1) */
  minScale?: number;
  /** Maximum scale limit (default: 10) */
  maxScale?: number;
  /** Zoom step ratio for button clicks (default: 0.2) */
  zoomStep?: number;
  /** Wheel zoom sensitivity (default: 0.001) */
  wheelSensitivity?: number;
}

/**
 * Canvas transform composable for zoom, pan, and drag interactions.
 *
 * Uses direct DOM manipulation instead of Vue reactivity for smooth
 * high-frequency updates (wheel, drag) without reactivity overhead.
 */
export function useCanvasTransform(options: CanvasTransformOptions = {}) {
  const {
    initialScale = 2,
    minScale = 0.1,
    maxScale = 10,
    zoomStep = 0.2,
    wheelSensitivity = 0.001,
  } = options;

  // DOM references
  const canvasRef = ref<HTMLElement>();
  const contentRef = ref<HTMLElement>();
  const zoomTextRef = ref<HTMLElement>();

  // Transform state (plain variables to avoid reactivity overhead)
  let scale = initialScale;
  let translateX = 0;
  let translateY = 0;

  // Drag state
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let initialTranslateX = 0;
  let initialTranslateY = 0;

  // ── Core ───────────────────────────────────────────────

  /** Apply current transform values to DOM elements */
  function applyTransform() {
    const content = contentRef.value;
    if (!content) return;

    content.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

    if (zoomTextRef.value) {
      zoomTextRef.value.textContent = `${Math.round(scale * 100)}%`;
    }
  }

  // ── Zoom ───────────────────────────────────────────────

  function zoomIn() {
    scale = Math.min(scale * (1 + zoomStep), maxScale);
    applyTransform();
  }

  function zoomOut() {
    scale = Math.max(scale / (1 + zoomStep), minScale);
    applyTransform();
  }

  function resetZoom() {
    scale = initialScale;
    translateX = 0;
    translateY = 0;
    applyTransform();
  }

  /** Handle wheel zoom centered on cursor position */
  function handleWheel(e: WheelEvent) {
    e.preventDefault();

    const canvas = canvasRef.value;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Mouse position relative to canvas center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Compute new scale
    const delta = -e.deltaY * wheelSensitivity;
    const newScale = Math.min(Math.max(scale * (1 + delta), minScale), maxScale);

    // Zoom toward cursor position
    const scaleRatio = newScale / scale;
    translateX = mouseX - (mouseX - translateX) * scaleRatio;
    translateY = mouseY - (mouseY - translateY) * scaleRatio;
    scale = newScale;

    applyTransform();
  }

  // ── Drag ───────────────────────────────────────────────

  function handleMouseDown(e: MouseEvent) {
    if (e.button !== 0) return;

    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    initialTranslateX = translateX;
    initialTranslateY = translateY;

    if (contentRef.value) {
      contentRef.value.style.cursor = 'grabbing';
    }

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
  }

  function handleGlobalMouseMove(e: MouseEvent) {
    if (!isDragging) return;

    translateX = initialTranslateX + (e.clientX - dragStartX);
    translateY = initialTranslateY + (e.clientY - dragStartY);

    applyTransform();
  }

  function handleGlobalMouseUp() {
    if (!isDragging) return;
    isDragging = false;

    if (contentRef.value) {
      contentRef.value.style.cursor = 'grab';
    }

    document.removeEventListener('mousemove', handleGlobalMouseMove);
    document.removeEventListener('mouseup', handleGlobalMouseUp);
  }

  // ── Lifecycle helpers ──────────────────────────────────

  /** Reset transform and prepare DOM for interaction */
  function initTransform() {
    scale = initialScale;
    translateX = 0;
    translateY = 0;

    requestAnimationFrame(() => {
      const content = contentRef.value;
      if (content) {
        content.style.transformOrigin = 'center center';
        content.style.cursor = 'grab';
        applyTransform();
      }
    });
  }

  /** Remove any lingering global event listeners */
  function cleanup() {
    document.removeEventListener('mousemove', handleGlobalMouseMove);
    document.removeEventListener('mouseup', handleGlobalMouseUp);
  }

  return {
    // DOM refs — bind these to template elements
    canvasRef,
    contentRef,
    zoomTextRef,

    // Zoom controls
    zoomIn,
    zoomOut,
    resetZoom,

    // Event handlers — bind these to template events
    handleWheel,
    handleMouseDown,

    // Lifecycle
    initTransform,
    cleanup,
  };
}
