import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import baseTheme from '../../../src/theme';

export default {
  extends: baseTheme,
} satisfies Theme;
