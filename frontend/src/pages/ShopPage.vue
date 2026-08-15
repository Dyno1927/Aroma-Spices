<template>
  <div
    class="min-h-screen transition-colors duration-200"
    style="background: var(--bg-page)"
  >
    <div class="flex-1">
      <main class="max-w-7xl mx-auto px-4 py-10">
        <div
          v-if="loading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="i in 6"
            :key="i"
            class="rounded-2xl overflow-hidden border"
            :style="{ background: 'var(--bg-card)' }"
          >
            <!-- Image -->
            <div class="h-56 w-full skeleton animate-shimmer"></div>

            <div class="p-5 space-y-3">
              <!-- Category -->
              <div class="h-5 w-28 rounded-full skeleton animate-shimmer"></div>

              <!-- Product Name -->
              <div
                class="h-5 w-3/4 rounded-full skeleton animate-shimmer"
              ></div>

              <!-- Description -->
              <div
                class="h-3.5 w-full rounded-full skeleton animate-shimmer"
              ></div>
              <div
                class="h-3.5 w-2/3 rounded-full skeleton animate-shimmer"
              ></div>

              <!-- Price + Stock -->
              <div class="flex justify-between items-center pt-1">
                <div
                  class="h-7 w-16 rounded-full skeleton animate-shimmer"
                ></div>
                <div
                  class="h-3.5 w-20 rounded-full skeleton animate-shimmer"
                ></div>
              </div>

              <!-- Buttons -->
              <div class="flex gap-2 pt-1">
                <div
                  class="h-10 flex-1 rounded-xl skeleton animate-shimmer"
                ></div>
                <div
                  class="h-10 flex-1 rounded-xl skeleton animate-shimmer"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="error" class="text-center py-20">
          <p class="text-lg" style="color: #7b2d3e">{{ error }}</p>
        </div>

        <template v-else>
          <p class="text-sm mb-6" style="color: var(--text-secondary)">
            Showing {{ filteredProducts.length }} of
            {{ products.length }} products
          </p>

          <div
            v-if="filteredProducts.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style="background: var(--bg-card)"
            >
              <!-- Image area — object-contain so full image shows -->
              <div
                class="h-144 flex items-center justify-center p-4 cursor-pointer"
                style="background: var(--bg-surface)"
                @click="goToProduct(product)"
              >
                <img
                  :src="`/${product.images?.[0]}`"
                  :alt="`${product.name} — Pure & Natural | Aroma Spices`"
                  @error="(e) => (e.target.src = 'placeholder.png')"
                  class="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500 rounded-2xl"
                />
              </div>

              <div class="p-5">
                <!-- Category badge -->
                <span
                  class="text-xs font-semibold px-2 py-1 rounded-full"
                  style="background: var(--bg-surface); color: var(--primary)"
                >
                  {{ product.category }}
                </span>

                <h2
                  @click="goToProduct(product)"
                  class="text-lg font-bold mt-2 mb-1 cursor-pointer transition hover:opacity-60"
                  style="color: var(--text-primary)"
                >
                  {{ product.name }}
                </h2>
                <p class="text-sm mb-4" style="color: var(--text-secondary)">
                  {{ product.description }}
                </p>

                <div class="flex justify-between items-center mb-4">
                  <span class="text-2xl font-bold" style="color: var(--primary)"
                    >₹{{ product.price }}</span
                  >
                  <span class="text-xs" style="color: var(--text-secondary)"
                    >Stock: {{ product.stock }}</span
                  >
                </div>

                <div class="flex gap-2">
                  <button
                    @click="goToProduct(product)"
                    class="flex-1 py-2 rounded-xl font-semibold text-sm transition hover:opacity-80"
                    style="
                      border: 1.5px solid var(--primary);
                      color: var(--primary);
                    "
                  >
                    View Details
                  </button>
                  <button
                    @click="handleAddToCart(product)"
                    class="flex-1 text-white py-2 rounded-xl font-semibold text-sm transition hover:opacity-90"
                    style="background: var(--primary)"
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-20">
            <p class="text-lg" style="color: var(--text-secondary)">
              No products found
            </p>
            <button
              @click="filteredProducts = products"
              class="mt-4 text-white px-6 py-2 rounded-xl transition hover:opacity-90"
              style="background: var(--primary)"
            >
              Clear Filters
            </button>
          </div>
        </template>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '@/composables/useCart.js';
import { useToast } from '@/composables/useToast.js';
import Fuse from 'fuse.js';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { addToast } = useToast();
const { addToCart } = useCart();

const products = ref([]);
const filteredProducts = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchProducts = async () => {
  try {
    loading.value = true;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    products.value = data.data;

    const category = route.query.category;
    const searchQuery = route.query.q;

    if (category) {
      filteredProducts.value = products.value.filter(
        (product) => product.category === category
      );
    } else if (searchQuery) {
      const fuse = new Fuse(data.data, {
        keys: ['name', 'description'],
        threshold: 0.3,
      });

      filteredProducts.value = fuse.search(searchQuery).map((r) => r.item);
    } else {
      filteredProducts.value = products.value;
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const goToProduct = (product) => {
  router.push(`/product/${product.name.toLowerCase().replaceAll(' ', '-')}`);
};

const handleAddToCart = (product) => {
  addToCart({ ...product, image: product.images?.[0] });
  addToast(`${product.name} added to cart!`, 'success');
};

const handleSearch = (results) => {
  filteredProducts.value = Array.isArray(results) ? results : products.value;
};

const handleFilterCategory = (category) => {
  filteredProducts.value =
    category === 'all'
      ? products.value
      : products.value.filter((p) => p.category === category);
};

watch(
  () => [route.query.category, route.query.q],
  () => {
    fetchProducts();
  }
);

onMounted(() => fetchProducts());
</script>
