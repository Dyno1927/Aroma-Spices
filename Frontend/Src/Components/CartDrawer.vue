<template>
  <div
    v-if="isOpen"
    @click="emit('closeCart')"
    class="fixed inset-0 bg-black/50 z-[998] backdrop-blur-sm"
  ></div>

  <div
    :class="[
      'fixed top-0 right-0 h-screen w-80 shadow-2xl z-[999] flex flex-col transition-transform duration-300',
      isOpen ? 'translate-x-0' : 'translate-x-full',
    ]"
    style="background: var(--bg-card)"
  >
    <!-- Header -->
    <div
      class="flex items-center justify-between p-4"
      style="border-bottom: 1px solid var(--border)"
    >
      <h2 class="text-xl font-bold" style="color: var(--text-primary)">
        🛒 Your Cart
      </h2>
      <button
        @click="emit('closeCart')"
        class="text-xl font-bold transition hover:opacity-50"
        style="color: var(--text-secondary)"
      >
        ✕
      </button>
    </div>

    <!-- Empty -->
    <div
      v-if="cart.length === 0"
      class="flex-1 flex flex-col items-center justify-center text-center p-6"
    >
      <p class="text-5xl mb-4">🛒</p>
      <p class="text-lg font-semibold" style="color: var(--text-secondary)">
        Your cart is empty!
      </p>
      <p
        class="text-sm mt-1"
        style="color: var(--text-secondary); opacity: 0.6"
      >
        Add some spices to get started
      </p>
    </div>

    <!-- Items -->
    <div v-else class="flex-1 overflow-y-auto p-4 space-y-3">
      <div
        v-for="item in cart"
        :key="item.id"
        class="flex gap-3 rounded-xl p-3"
        style="background: var(--bg-surface)"
      >
        <img
          :src="`/${item.image}`"
          :alt="`${item.name} — Pure & Natural | Aroma Spices`"
          @error="(e) => (e.target.src = 'placeholder.png')"
          class="w-16 h-16 object-cover rounded-lg flex-shrink-0"
        />
        <div class="flex-1 min-w-0">
          <p
            class="font-semibold text-sm truncate"
            style="color: var(--text-primary)"
          >
            {{ item.name }}
          </p>
          <p class="text-sm font-bold" style="color: var(--primary)">
            ₹{{ item.price }}
          </p>
          <div class="flex items-center gap-2 mt-2">
            <button
              @click="emit('decreaseQty', item.id)"
              class="w-6 h-6 text-white rounded-full text-sm flex items-center justify-center transition hover:opacity-80"
              style="background: var(--primary)"
            >
              −
            </button>
            <span
              class="text-sm font-bold w-4 text-center"
              style="color: var(--text-primary)"
              >{{ item.quantity }}</span
            >
            <button
              @click="emit('increaseQty', item.id)"
              class="w-6 h-6 text-white rounded-full text-sm flex items-center justify-center transition hover:opacity-80"
              style="background: var(--primary)"
            >
              +
            </button>
          </div>
        </div>
        <button
          @click="emit('removeItem', item.id)"
          class="text-lg self-start transition hover:opacity-50"
          style="color: var(--text-secondary)"
        >
          🗑️
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div
      v-if="cart.length > 0"
      class="p-4"
      style="border-top: 1px solid var(--border)"
    >
      <div class="flex justify-between items-center mb-4">
        <span class="font-semibold" style="color: var(--text-secondary)"
          >Total:</span
        >
        <span class="text-2xl font-bold" style="color: var(--primary)"
          >₹{{ total }}</span
        >
      </div>
      <button
        class="w-full text-white py-3 rounded-xl font-bold text-lg transition hover:opacity-90"
        style="background: var(--primary)"
        @click="goToCheckout"
      >
        Checkout 💳
      </button>
      <button
        @click="emit('clearCart')"
        class="w-full mt-2 text-sm transition hover:opacity-50"
        style="color: var(--text-secondary)"
      >
        Clear Cart
      </button>
    </div>
  </div>
</template>

<script setup>
/**
 * Cart Drawer Component
 * Slide-out panel displaying shopping cart items with quantity controls
 * Emits: closeCart, removeItem, increaseQty, decreaseQty, clearCart
 */

import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  isOpen: { type: Boolean, required: true },
  cart: { type: Array, required: true },
});

const emit = defineEmits([
  'closeCart',
  'removeItem',
  'increaseQty',
  'decreaseQty',
  'clearCart',
]);

const goToCheckout = () => {
  emit('closeCart');
  router.push('/checkout');
};

const total = computed(() =>
  props.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
</script>
