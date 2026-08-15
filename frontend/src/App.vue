<template>
  <div
    class="min-h-screen transition-colors duration-200"
    style="background: var(--bg-page)"
  >
    <!-- Email Verification Banner -->
    <div
      v-if="isLoggedIn && !emailVerified"
      class="bg-yellow-50 border-b border-yellow-200 text-center py-2 px-4 text-sm text-yellow-800"
    >
      📧 Please verify your email address.
      <button
        @click="resendVerification"
        :disabled="resendLoading"
        class="underline font-semibold ml-1 disabled:opacity-50"
      >
        {{ resendLoading ? 'Sending...' : 'Resend link' }}
      </button>
      <span v-if="resendDone" class="ml-2 text-green-600 font-medium"
        >✓ Sent!</span
      >
    </div>

    <Header v-if="showLayout" @toggleSidebar="sidebar.toggleSidebar" />

    <Sidebar
      :isOpen="sidebar.isOpen"
      @toggleSidebar="sidebar.toggleSidebar"
      @filterCategory="handleFilter"
    />

    <RouterView />
    <Toast />

    <CartDrawer
      :isOpen="cartOpen"
      :cart="cart"
      @closeCart="closeCart"
      @removeItem="removeFromCart"
      @increaseQty="increaseQty"
      @decreaseQty="decreaseQty"
      @clearCart="clearCart"
    />
  </div>
</template>

<script setup>
/**
 * Root App Component
 * Manages global layout, authentication state, cart, theme, and sidebar
 */

import CartDrawer from '@/components/CartDrawer.vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Toast from '@/components/Toast.vue';
import { useAuth } from '@/composables/useAuth.js';
import { useCart } from '@/composables/useCart.js';
import { useSidebar } from '@/composables/useSidebar.js';
import { useTheme } from '@/composables/useTheme.js';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const {
  cart,
  cartOpen,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  closeCart,
} = useCart();
const { initTheme } = useTheme();
const { isLoggedIn, emailVerified, refreshAccessToken } = useAuth();
const sidebar = useSidebar();
const router = useRouter();
const route = useRoute();

const showLayout = computed(() => !route.meta.hideLayout);

// Email resend state
const resendLoading = ref(false);
const resendDone = ref(false);

const resendVerification = async () => {
  resendLoading.value = true;
  resendDone.value = false;
  try {
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/resend-verification`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    resendDone.value = true;
  } catch (err) {
    console.error('Resend failed:', err);
  } finally {
    resendLoading.value = false;
  }
};

const handleFilter = (category) => {
  sidebar.toggleSidebar();

  router.push({
    path: '/shop',
    query: category !== 'all' ? { category } : {},
  });
};

onMounted(async () => {
  initTheme();
  await refreshAccessToken();
});
</script>
