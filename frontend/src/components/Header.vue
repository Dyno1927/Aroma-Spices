<template>
  <header
    class="sticky top-0 z-40 shadow-sm transition-colors duration-200"
    style="background: var(--bg-card); border-bottom: 1px solid var(--border)"
  >
    <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
      <!-- Hamburger -->
      <button
        @click="emit('toggleSidebar')"
        :class="[
          'flex flex-col gap-[5px] p-2 rounded transition hover:opacity-60 flex-shrink-0',
        ]"
      >
        <span
          class="block w-5 h-[2px]"
          style="background: var(--primary)"
        ></span>
        <span
          class="block w-5 h-[2px]"
          style="background: var(--primary)"
        ></span>
        <span
          class="block w-5 h-[2px]"
          style="background: var(--primary)"
        ></span>
      </button>

      <!-- Logo -->
      <RouterLink to="/shop" class="flex-shrink-0">
        <img
          src="../assets/Icon.png"
          alt="Pure Indian spices — Aroma Spices, Aligarh"
          class="h-9 w-9 object-contain"
        />
      </RouterLink>

      <!-- Search -->
      <div
        :class="[
          'flex-1 flex gap-2',
          { invisible: !isShopPage, 'pointer-events-none': !isShopPage },
        ]"
      >
        <input
          v-model="searchQuery"
          name="searchField"
          id="searchField"
          type="text"
          placeholder="Search spices..."
          autocomplete="off"
          aria-label="Search spices"
          class="flex-1 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 transition"
          style="
            background: var(--bg-surface);
            color: var(--text-primary);
            border: 1px solid var(--border);
          "
          @keyup.enter="performSearch"
        />
        <button
          @click="performSearch"
          class="text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition hover:opacity-90 flex-shrink-0"
          style="background: var(--primary)"
        >
          🔍
        </button>
      </div>

      <!-- Nav Links -->
      <div class="hidden lg:flex items-center gap-6 flex-shrink-0">
        <RouterLink
          to="/shop"
          class="text-sm font-medium transition hover:opacity-60 whitespace-nowrap"
          style="color: var(--text-secondary)"
          >Home</RouterLink
        >
        <RouterLink
          to="/products"
          class="text-sm font-medium transition hover:opacity-60 whitespace-nowrap"
          style="color: var(--text-secondary)"
          >Products</RouterLink
        >
        <RouterLink
          to="/about"
          class="text-sm font-medium transition hover:opacity-60 whitespace-nowrap"
          style="color: var(--text-secondary)"
          >About</RouterLink
        >
        <RouterLink
          to="/contact"
          class="text-sm font-medium transition hover:opacity-60 whitespace-nowrap"
          style="color: var(--text-secondary)"
          >Contact</RouterLink
        >
      </div>

      <div class="flex-shrink-0"><ThemeToggle /></div>

      <!-- Auth -->
      <RouterLink
        v-if="!isLoggedIn"
        to="/auth"
        class="flex-shrink-0 text-white text-xs font-bold px-4 py-2 rounded-xl transition hover:opacity-90 whitespace-nowrap hidden lg:block"
        style="background: var(--primary)"
      >
        Login
      </RouterLink>

      <button
        v-else
        @click="logout"
        class="flex-shrink-0 text-xs font-medium transition hover:opacity-60 whitespace-nowrap hidden lg:block"
        style="color: var(--text-secondary)"
      >
        Logout
      </button>

      <!-- Cart -->
      <button
        @click="openCart"
        class="relative text-2xl hover:scale-110 transition flex-shrink-0"
        style="color: var(--primary)"
      >
        🛒
        <span
          class="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          style="background: var(--primary)"
          >{{ cartCount }}</span
        >
      </button>
    </nav>
  </header>
</template>

<script setup>
/**
 * Header Component
 * Navigation bar with logo, search, auth buttons, cart, and theme toggle
 * Uses Fuse.js for fuzzy product search
 */

import ThemeToggle from '@/components/ThemeToggle.vue';
import { useAuth } from '@/composables/useAuth.js';
import { useCart } from '@/composables/useCart.js';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const emit = defineEmits(['toggleSidebar']);
const { cartCount, openCart } = useCart();
const searchQuery = ref('');
const route = useRoute();
const router = useRouter();
const isShopPage = computed(() => route.name === 'Shop');
const { isLoggedIn, logout } = useAuth();

const performSearch = () => {
  const query = searchQuery.value.trim();
  router.push({
    path: '/shop',
    query: query ? { q: query } : {},
  });
};
</script>
