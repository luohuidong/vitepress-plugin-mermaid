<script setup>
import DefaultTheme from 'vitepress/theme';
import MermaidPreview from './MermaidPreview.vue';

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <MermaidPreview />
    </template>
  </Layout>
</template>
