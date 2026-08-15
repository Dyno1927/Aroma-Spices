<template>
  <div
    class="min-h-screen bg-[var(--bg-page)] flex items-center justify-center px-4 py-16"
  >
    <div class="max-w-md w-full text-center">
      <!-- Success -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-8 shadow-sm">
        <div class="text-6xl mb-4">🎉</div>
        <h1 class="text-2xl font-bold text-[var(--primary)] mb-2">
          Order Placed!
        </h1>
        <p class="text-[var(--text-muted)] mb-6">
          Thank you for your order. We'll get your spices packed and on the way
          soon.
        </p>

        <!-- Order ID -->
        <div
          v-if="orderId"
          class="bg-[var(--bg-page)] rounded-xl px-4 py-3 mb-6 text-sm text-[var(--text-muted)]"
        >
          Order ID:
          <span class="font-mono font-semibold text-[var(--text)]">{{
            orderId
          }}</span>
        </div>

        <!-- WhatsApp CTA -->
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition mb-3"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15
                     -.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075
                     -.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059
                     -.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52
                     .149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52
                     -.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51
                     -.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372
                     -.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074
                     .149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625
                     .712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413
                     .248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
            />
            <path
              d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.845L0 24l6.335-1.51
                     A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882
                     a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374
                     A9.867 9.867 0 012.118 12C2.118 6.531 6.531 2.118 12 2.118
                     c5.469 0 9.882 4.413 9.882 9.882 0 5.468-4.413 9.882-9.882 9.882z"
            />
          </svg>
          Track on WhatsApp
        </a>

        <router-link
          to="/products"
          class="block w-full py-3 rounded-xl border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg-page)] transition text-sm font-medium"
        >
          Continue Shopping
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSEO } from '@/composables/useSEO';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

useSEO({
  title: 'Order Confirmed',
  description: 'Your order has been placed — Aroma Spices',
  url: 'https://aromaspicies.com/order-confirm',
});

const route = useRoute();
const orderId = computed(() => route.query.orderId || null);

const whatsappUrl = computed(() => {
  const msg = orderId.value
    ? `Hi! I just placed an order on Aroma Spices. Order ID: ${orderId.value}`
    : `Hi! I just placed an order on Aroma Spices.`;
  return `https://wa.me/919105067555?text=${encodeURIComponent(msg)}`;
});
</script>
