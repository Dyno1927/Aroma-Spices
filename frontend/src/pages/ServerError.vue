<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-4 text-center transition-colors duration-200"
    style="background: var(--bg-page)"
  >
    <p class="text-8xl mb-6">🫙</p>
    <h1 class="text-6xl font-bold mb-2" style="color: #7b2d3e">500</h1>
    <p class="text-2xl font-bold mb-2" style="color: var(--text-primary)">
      Something went wrong in the kitchen.
    </p>
    <p class="mb-8 max-w-sm" style="color: var(--text-secondary)">
      We're having trouble on our end. Please try again in a moment.
    </p>
    <button
      @click="router.back()"
      class="px-6 py-3 rounded-xl font-semibold text-white transition hover:opacity-90"
      style="background: #7b2d3e"
    >
      Go Back
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
