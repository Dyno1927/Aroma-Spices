<template>
  <div
    class="min-h-screen transition-colors duration-200"
    style="background: var(--bg-page)"
  >
    <div class="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <h1 class="text-4xl font-bold mb-2" style="color: var(--primary)">
        🌶️ Our Products
      </h1>
      <p class="mb-8 text-sm" style="color: var(--text-secondary)">
        Search for your favourite spice
      </p>

      <div class="w-full max-w-2xl flex gap-3">
        <input
          name="searchQuery"
          id="searchQuery"
          v-model="searchQuery"
          type="text"
          placeholder="Search spices... e.g. Turmeric, Honey"
          autocomplete="off"
          aria-label="Search spices"
          class="flex-1 px-6 py-4 text-lg rounded-xl focus:outline-none focus:ring-2 transition"
          style="
            background: var(--bg-card);
            color: var(--text-primary);
            border: 2px solid var(--border);
          "
          @keyup.enter="performSearch"
        />
        <button
          @click="performSearch"
          class="text-white px-8 py-4 rounded-xl font-bold text-lg transition hover:opacity-90"
          style="background: var(--primary)"
        >
          🔍
        </button>
      </div>

      <div
        v-if="searchResults.length > 0"
        class="w-full max-w-2xl mt-4 rounded-xl shadow-lg overflow-hidden"
        style="background: var(--bg-card)"
      >
        <div
          v-for="result in searchResults"
          :key="result.id"
          @click="goToProduct(result)"
          class="flex items-center gap-4 p-4 cursor-pointer transition hover:opacity-70"
          style="border-bottom: 1px solid var(--border)"
        >
          <img
            :src="`/${result.images?.[0]}`"
            :alt="`${result.name} — Pure & Natural | Aroma Spices`"
            @error="(e) => (e.target.src = 'placeholder.png')"
            class="w-12 h-12 object-cover rounded-lg"
          />
          <div>
            <p class="font-semibold" style="color: var(--text-primary)">
              {{ result.name }}
            </p>
            <p class="font-bold text-sm" style="color: var(--primary)">
              ₹{{ result.price }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSEO } from '@/composables/useSEO';
import Fuse from 'fuse.js';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

useSEO({
  title: 'Buy Indian Spices Online — Turmeric, Cumin & More',
  description:
    'Browse our full range of pure Indian spices — powder, whole, premium herbs and natural sweeteners. Fresh, natural, delivered to your door.',
  url: 'https://aromaspicies.com/products',
});

const router = useRouter();
const products = ref([]);
const searchQuery = ref('');
const searchResults = ref([]);

const fetchProducts = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
    const data = await res.json();

    products.value = data.data;
  } catch (e) {
    console.error(e);
  }
};

const performSearch = () => {
  if (!searchQuery.value.trim()) return;
  const fuse = new Fuse(products.value, {
    keys: ['name', 'description'],
    threshold: 0.3,
  });
  searchResults.value = fuse.search(searchQuery.value).map((r) => r.item);
};

const goToProduct = (p) =>
  router.push(`/product/${p.name.toLowerCase().replaceAll(' ', '-')}`);

onMounted(() => fetchProducts());
</script>
