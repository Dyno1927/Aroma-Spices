<template>
  <div class="relative w-full h-screen overflow-hidden">
    <!-- Banner -->
    <img
      src="../assets/Banner.png"
      alt="Pure Indian spices — Aroma Spices, Aligarh"
      class="absolute inset-0 w-full h-full object-cover object-top"
    />

    <!-- Gradient overlay -->
    <div
      class="absolute inset-0"
      style="
        background: linear-gradient(
          to top,
          #0b1420 0%,
          rgba(11, 20, 32, 0.65) 40%,
          rgba(30, 58, 95, 0.3) 100%
        );
      "
    ></div>

    <!-- Nav -->
    <nav
      class="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6"
    >
      <div class="flex items-center gap-3">
        <img
          src="../assets/Icon.png"
          alt="Aroma Spices"
          class="h-10 w-10 object-contain"
        />
        <span class="text-white font-bold text-xl tracking-wide"
          >Aroma Spices</span
        >
      </div>
      <div class="hidden md:flex items-center gap-8">
        <RouterLink
          to="/shop"
          class="text-white/70 hover:text-white text-sm font-medium transition"
          >Home</RouterLink
        >
        <RouterLink
          to="/products"
          class="text-white/70 hover:text-white text-sm font-medium transition"
          >Products</RouterLink
        >
        <RouterLink
          to="/about"
          class="text-white/70 hover:text-white text-sm font-medium transition"
          >About</RouterLink
        >
        <RouterLink
          to="/contact"
          class="text-white/70 hover:text-white text-sm font-medium transition"
          >Contact</RouterLink
        >
        <ThemeToggle />
        <button
          @click="openCart"
          class="relative text-2xl text-white hover:scale-110 transition"
        >
          🛒
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
            style="background: #d8c3a5; color: #0b1420"
          >
            {{ cartCount }}
          </span>
        </button>
      </div>
    </nav>

    <!-- Hero -->
    <div
      class="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-28"
    >
      <p
        class="text-xs font-bold tracking-widest uppercase mb-6"
        style="color: #a8c5d6"
      >
        Pure Taste • Rich Aroma • Natural Goodness
      </p>
      <h1 class="text-white text-5xl md:text-7xl font-bold leading-tight mb-4">
        Pure Spices.<br />
        <span style="color: #a8c5d6">Crafted Naturally.</span>
      </h1>
      <p class="text-lg max-w-md mb-10" style="color: rgba(255, 255, 255, 0.6)">
        Sourced directly from farms across India. No additives, no compromises.
      </p>
      <button
        @click="goToShop"
        class="text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:opacity-90 shadow-xl"
        style="background: #1e3a5f; border: 1px solid rgba(168, 197, 214, 0.3)"
      >
        Start Shopping →
      </button>
    </div>

    <!-- Search -->
    <div class="absolute bottom-0 left-0 right-0 px-4 pb-10">
      <div class="max-w-2xl mx-auto flex gap-3">
        <input
          v-model="searchQuery"
          name="landingSearch"
          id="landing-search"
          type="text"
          placeholder="Search for Spices..."
          autocomplete="off"
          aria-label="Search spices"
          @keyup.enter="goToShop"
          class="flex-1 px-6 py-4 rounded-xl text-sm focus:outline-none focus:ring-2 transition"
          style="background: rgba(255, 255, 255, 0.95); color: #1e3a5f"
        />
        <button
          @click="goToShop"
          class="text-white px-8 py-4 rounded-xl font-bold transition hover:opacity-90"
          style="background: #1e3a5f"
        >
          🔍
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import ThemeToggle from '@/components/ThemeToggle.vue';
import { useCart } from '@/composables/useCart.js';
import { useSEO } from '@/composables/useSEO.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

useSEO({
  title: 'Buy Pure Indian Spices Online — Aligarh',
  description:
    'Shop 100% natural spices online. Turmeric, cumin, coriander and more. Delivered fresh from Aligarh, UP.',
  url: 'https://aromaspicies.com/',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Aroma Spices',
    telephone: '+919105067555',
    email: 'amitkumar762@gmail.com',
    url: 'https://aromaspicies.com',
    sameAs: [
      'https://www.instagram.com/Aroma_Species',
      'https://www.facebook.com/AromaSpices',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Aligarh',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
  },
});

const router = useRouter();
const searchQuery = ref('');
const { cartCount, openCart } = useCart();

const goToShop = () => {
  router.push({
    path: '/shop',
    query: searchQuery.value.trim() ? { q: searchQuery.value.trim() } : {},
  });
};
</script>
