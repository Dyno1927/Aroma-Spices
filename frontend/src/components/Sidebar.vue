<template>
  <div
    v-if="isOpenComputed"
    @click="emit('toggleSidebar')"
    class="fixed inset-0 bg-black/30 backdrop-blur-sm"
  ></div>
  <div class="fixed left-0 top-0 h-screen z-[999]">
    <div
      :class="[
        'h-screen transition-all duration-300 flex flex-col overflow-hidden',
        isOpenComputed ? 'w-72' : 'w-0',
      ]"
      style="background: #1e3a5f"
    >
      <div class="flex items-center justify-between p-6">
        <div v-if="isOpenComputed">
          <h2 class="text-2xl font-bold text-white">🌶️ Aroma</h2>
          <p class="text-xs mt-1" style="color: rgba(168, 197, 214, 0.7)">
            Premium Spices
          </p>
        </div>
        <button
          v-if="isOpenComputed"
          @click.stop="emit('toggleSidebar')"
          class="text-white/50 hover:text-white p-2 rounded transition text-xl font-bold ml-auto"
        >
          ✕
        </button>
      </div>
      <div v-if="isOpenComputed" class="px-6 pb-6 overflow-y-auto flex-1">
        <div class="mb-8">
          <h3
            class="text-xs font-bold mb-4 uppercase tracking-widest"
            style="color: rgba(168, 197, 214, 0.5)"
          >
            Quick Links
          </h3>
          <nav class="space-y-1">
            <RouterLink
              @click.stop="emit('toggleSidebar')"
              to="/shop"
              class="block text-sm text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
              >🏠 Home</RouterLink
            >
            <RouterLink
              @click.stop="emit('toggleSidebar')"
              to="/products"
              class="block text-sm text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
              >📦 All Products</RouterLink
            >
            <RouterLink
              @click.stop="emit('toggleSidebar')"
              to="/about"
              class="block text-sm text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
              >ℹ️ About</RouterLink
            >
            <RouterLink
              @click.stop="emit('toggleSidebar')"
              to="/contact"
              class="block text-sm text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
              >📞 Contact</RouterLink
            >
          </nav>
        </div>

        <div>
          <h3
            class="text-xs font-bold mb-4 uppercase tracking-widest"
            style="color: rgba(168, 197, 214, 0.5)"
          >
            Filter by Category
          </h3>
          <nav class="space-y-1">
            <button
              v-for="cat in categories"
              :key="cat.value"
              @click="filterByCategory(cat.value)"
              class="w-full text-left text-sm text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
            >
              {{ cat.label }}
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Sidebar Navigation Component
 * Mobile navigation drawer with quick links and category filters
 * Auto-closes on mobile when a category is selected
 */

import { computed, unref } from 'vue';

const props = defineProps({
  isOpen: { type: [Boolean, Object], required: true },
});

const emit = defineEmits(['filterCategory', 'toggleSidebar']);

// Handle both boolean and Ref
const isOpenComputed = computed(() => unref(props.isOpen));

const categories = [
  { label: '⭐ All Products', value: 'all' },
  { label: '🌶️ Powder Spices', value: 'Most Used Powder Spices' },
  { label: '🫘 Whole Spices', value: 'Daily Use Whole Spices' },
  { label: '👑 Premium Spices', value: 'Premium & Less Used Spices' },
  { label: '🌿 Herbs & Leaves', value: 'Herbs & Leaves' },
  { label: '🍯 Sweeteners & Salts', value: 'Natural Sweeteners & Salts' },
  { label: '🩷 Special Occasion', value: 'Specialty Masalas' },
];

const filterByCategory = (category) => {
  emit('filterCategory', category);
  if (window.innerWidth < 768) emit('toggleSidebar');
};
</script>
