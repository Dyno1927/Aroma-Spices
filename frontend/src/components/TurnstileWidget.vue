<template>
  <div ref="container"></div>
</template>

<script setup>
/**
 * Cloudflare Turnstile CAPTCHA Widget Component
 * Renders bot verification widget and emits verification token or error
 * Includes manual control for widget rendering and reset
 */

import { onMounted, onUnmounted, ref } from 'vue';

const emit = defineEmits(['verified', 'error']);
const container = ref(null);
let widgetId = null;

const loadScript = () =>
  new Promise((resolve) => {
    // check for the script tag itself, not just window.turnstile
    if (document.querySelector('script[src*="turnstile"]')) {
      const poll = setInterval(() => {
        if (window.turnstile) {
          clearInterval(poll);
          resolve();
        }
      }, 50);
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    s.async = true;
    s.defer = true;
    s.onload = resolve;
    document.head.appendChild(s);
  });

onMounted(async () => {
  await loadScript();
  widgetId = window.turnstile.render(container.value, {
    sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
    callback: (token) => emit('verified', token),
    'error-callback': () => emit('error'),
  });
});

onUnmounted(() => {
  if (widgetId !== null) window.turnstile.remove(widgetId);
});

defineExpose({
  reset: () => widgetId !== null && window.turnstile.reset(widgetId),
});
</script>
