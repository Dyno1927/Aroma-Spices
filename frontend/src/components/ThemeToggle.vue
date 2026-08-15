<template>
  <div
    class="flex items-center gap-1 rounded-lg p-1"
    style="background: var(--bg-surface); border: 1px solid var(--border)"
  >
    <button
      v-for="option in options"
      :key="option.value"
      @click="setTheme(option.value)"
      :title="option.label"
      class="px-2 py-1 rounded text-xs font-semibold transition-all"
      :style="
        theme === option.value
          ? 'background: var(--primary); color: white;'
          : 'color: var(--text-secondary);'
      "
    >
      {{ option.icon }}
    </button>
  </div>
</template>

<script setup>
/**
 * Theme Toggle Component
 * Provides light/dark/system theme selection buttons
 */

import { useTheme } from '@/composables/useTheme.js';

const { theme, setTheme } = useTheme();

const options = [
  { value: 'light', icon: '☀️', label: 'Light' },
  { value: 'system', icon: '💻', label: 'System' },
  { value: 'dark', icon: '🌙', label: 'Dark' },
];
</script>
