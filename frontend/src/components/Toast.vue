<template>
  <div class="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="flex items-center justify-between gap-4 px-4 py-3 rounded-xl shadow-lg text-white min-w-[260px]"
      :style="
        toast.type === 'success'
          ? 'background: var(--primary)'
          : 'background: #7B2D3E'
      "
    >
      <span class="text-sm font-semibold" v-html="toast.msg"></span>
      <button
        @click="removeToast(toast.id)"
        class="text-white/70 hover:text-white font-bold transition"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
/**
 * Toast Notification Component
 * Displays toast notifications in bottom-right corner with close button
 * Success notifications are green, error notifications are red
 */

import { useToast } from '@/composables/useToast.js';
const { toasts, removeToast } = useToast();
</script>
