<template>
  <div ref="container" class="mermaid-container">
    <div v-if="error" class="mermaid-error">
      <pre>{{ error }}</pre>
    </div>
    <div
      v-else-if="svg"
      class="mermaid-svg"
      :class="{ 'is-clickable': true }"
      @click="handleClick"
      v-html="svg"
    ></div>
    <div v-else class="mermaid-loading">Loading diagram...</div>

    <!-- Click hint -->
    <div v-if="svg && !error" class="mermaid-hint">
      <svg viewBox="0 0 24 24" width="14" height="14">
        <path
          fill="currentColor"
          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"
        />
      </svg>
      Click to view full size
    </div>
  </div>
  <div v-if="showCode" class="mermaid-code">
    <pre><code>{{ decodedGraph }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useData } from 'vitepress';
import mermaid from 'mermaid';
import { useMermaidPreview } from './useMermaidPreview';

interface Props {
  id: string;
  graph: string;
  showCode?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showCode: false,
});

const container = ref<HTMLElement>();
const svg = ref('');
const error = ref('');
const { isDark } = useData();
const { open } = useMermaidPreview();

const decodedGraph = computed(() => {
  return decodeURIComponent(props.graph);
});

const renderMermaid = async () => {
  if (!container.value) return;

  try {
    error.value = '';

    // 初始化 mermaid 配置
    mermaid.initialize({
      theme: isDark.value ? 'dark' : 'default',
      themeVariables: {
        primaryColor: isDark.value ? '#1e3a5f' : '#e1f5fe',
        primaryTextColor: isDark.value ? '#ffffff' : '#01579b',
        primaryBorderColor: isDark.value ? '#4a90d9' : '#0288d1',
        lineColor: isDark.value ? '#4a90d9' : '#0288d1',
        secondaryColor: isDark.value ? '#4a3d2a' : '#fff3e0',
        tertiaryColor: isDark.value ? '#2d4a2d' : '#e8f5e9',
      },
      startOnLoad: false,
    });

    // 渲染图表
    const { svg: renderedSvg } = await mermaid.render(props.id, decodedGraph.value);
    svg.value = renderedSvg;
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err);
    console.error('Mermaid render error:', err);
  }
};

const handleClick = () => {
  if (svg.value) {
    open(svg.value);
  }
};

onMounted(() => {
  renderMermaid();
});

watch(isDark, () => {
  renderMermaid();
});
</script>

<style scoped>
.mermaid-container {
  margin: 1rem 0;
  overflow-x: auto;
  position: relative;
}

.mermaid-svg {
  display: flex;
  justify-content: center;
  transition: all 0.2s ease;
}

.mermaid-svg.is-clickable {
  cursor: zoom-in;
}

.mermaid-svg:hover {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.mermaid-svg :deep(svg) {
  max-width: 100%;
  height: auto;
}

.mermaid-loading {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.mermaid-error {
  padding: 1rem;
  background-color: var(--vp-c-danger-soft);
  border: 1px solid var(--vp-c-danger-2);
  border-radius: 8px;
  color: var(--vp-c-danger-1);
}

.mermaid-error pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.mermaid-code {
  margin-top: 1rem;
}

.mermaid-code pre {
  margin: 0;
  padding: 1rem;
  background-color: var(--vp-code-block-bg);
  border-radius: 8px;
  overflow-x: auto;
}

.mermaid-code code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--vp-code-block-color);
}

.mermaid-hint {
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.mermaid-container:hover .mermaid-hint {
  opacity: 1;
}
</style>
