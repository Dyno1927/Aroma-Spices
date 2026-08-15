<template>
  <div
    class="min-h-screen transition-colors duration-200"
    style="background: var(--bg-page)"
  >
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <p style="color: var(--text-secondary)">Loading product...</p>
    </div>

    <div
      v-else-if="!product"
      class="flex flex-col items-center justify-center min-h-[60vh]"
    >
      <p style="color: var(--text-secondary)">Product not found!</p>
      <button
        @click="router.back()"
        class="mt-4 font-semibold hover:opacity-60 transition"
        style="color: var(--primary)"
      >
        ← Go Back
      </button>
    </div>

    <div v-else class="max-w-5xl mx-auto px-4 py-12">
      <button
        @click="router.back()"
        class="text-sm font-semibold hover:opacity-60 transition mb-8 flex items-center gap-2"
        style="color: var(--primary)"
      >
        ← Back
      </button>

      <!-- Product card -->
      <div
        class="rounded-2xl shadow-lg overflow-hidden md:flex mb-12"
        style="background: var(--bg-card)"
      >
        <!-- Image -->
        <div class="w-full md:w-1/2 relative">
          <img
            :src="`/${images[currentImage]}`"
            :alt="`${product.name} — Pure & Natural | Aroma Spices`"
            @error="(e) => (e.target.src = 'placeholder.png')"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute bottom-4 left-0 right-0 flex justify-center gap-2"
          >
            <button
              v-for="(_, i) in images"
              :key="i"
              @click="currentImage = i"
              class="w-2.5 h-2.5 rounded-full transition"
              :style="
                currentImage === i
                  ? 'background: var(--primary)'
                  : 'background: rgba(255,255,255,0.6)'
              "
            ></button>
          </div>
          <button
            v-if="images.length > 1"
            @click="prevImage"
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition text-white"
            style="background-color: var(--primary-h)"
          >
            &larr;
          </button>
          <button
            v-if="images.length > 1"
            @click="nextImage"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition text-white"
            style="background-color: var(--primary-h)"
          >
            &rarr;
          </button>
        </div>

        <!-- Info -->
        <div class="p-8 flex flex-col justify-between flex-1">
          <div>
            <h1
              class="text-3xl font-bold mb-3"
              style="color: var(--text-primary)"
            >
              {{ product.name }}
            </h1>
            <p
              class="leading-relaxed mb-6"
              style="color: var(--text-secondary)"
            >
              {{ product.description }}
            </p>
            <p class="text-4xl font-bold mb-1" style="color: var(--primary)">
              ₹{{ product.price }}
            </p>
            <p class="text-sm mb-6" style="color: var(--text-secondary)">
              {{ product.stock }} units in stock
            </p>
          </div>

          <div class="flex items-center gap-3 flex-wrap">
            <div
              class="flex items-center gap-2 rounded-xl px-3 py-2"
              style="border: 1.5px solid var(--border)"
            >
              <button
                @click="decreaseQty"
                class="font-bold text-lg w-6 text-center hover:opacity-60 transition"
                style="color: var(--primary)"
              >
                −
              </button>
              <span
                class="font-bold w-6 text-center"
                style="color: var(--text-primary)"
                >{{ quantity }}</span
              >
              <button
                @click="increaseQty"
                class="font-bold text-lg w-6 text-center hover:opacity-60 transition"
                style="color: var(--primary)"
              >
                +
              </button>
            </div>
            <button
              @click="handleAddToCart"
              class="flex-1 text-white py-3 rounded-xl font-bold transition hover:opacity-90"
              style="background: var(--primary)"
            >
              🛒 Add to Cart
            </button>
            <button
              @click="handleBuyNow"
              class="flex-1 text-white py-3 rounded-xl font-bold transition hover:opacity-90"
              style="background: #3d6b8a"
            >
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>

      <!-- Related -->
      <div v-if="relatedProducts.length > 0" class="mb-12">
        <h2 class="text-2xl font-bold mb-6" style="color: var(--text-primary)">
          More {{ product.category === 'honey' ? 'Honey' : 'Spices' }}
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="related in relatedProducts"
            :key="related.id"
            @click="goToProduct(related)"
            class="rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden hover:-translate-y-1 duration-200"
            style="background: var(--bg-card)"
          >
            <img
              :src="`/${related.image}`"
              :alt="`${related.name} — Pure & Natural | Aroma Spices`"
              @error="(e) => (e.target.src = 'placeholder.png')"
              class="w-full h-32 object-cover"
            />
            <div class="p-3">
              <p
                class="font-semibold text-sm"
                style="color: var(--text-primary)"
              >
                {{ related.name }}
              </p>
              <p class="font-bold text-sm" style="color: var(--primary)">
                ₹{{ related.price }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews -->
      <div class="rounded-2xl shadow-lg p-8" style="background: var(--bg-card)">
        <h2 class="text-2xl font-bold mb-8" style="color: var(--text-primary)">
          ⭐ Customer Reviews
        </h2>

        <!-- Submit -->
        <div class="rounded-xl p-6 mb-8" style="background: var(--bg-surface)">
          <h3 class="text-lg font-bold mb-4" style="color: var(--text-primary)">
            Write a Review
          </h3>
          <div class="flex gap-2 mb-4">
            <button
              v-for="star in 5"
              :key="star"
              @click="setRating(star)"
              :class="[
                'text-3xl transition',
                star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300',
              ]"
            >
              ★
            </button>
          </div>
          <input
            id="reviewer-name"
            name="reviewerName"
            v-model="newReview.name"
            type="text"
            autocomplete="name"
            aria-label="Your name"
            placeholder="Your name"
            class="w-full px-4 py-2 rounded-lg mb-3 focus:outline-none transition"
            style="
              background: var(--bg-card);
              color: var(--text-primary);
              border: 1px solid var(--border);
            "
          />
          <textarea
            id="review-comment"
            name="reviewComment"
            v-model="newReview.comment"
            rows="3"
            autocomplete="off"
            aria-label="Share your experience"
            placeholder="Share your experience..."
            class="w-full px-4 py-2 rounded-lg resize-none mb-4 focus:outline-none transition"
            style="
              background: var(--bg-card);
              color: var(--text-primary);
              border: 1px solid var(--border);
            "
          ></textarea>
          <button
            @click="submitReview"
            class="text-white px-8 py-2 rounded-lg font-bold transition hover:opacity-90"
            style="background: var(--primary)"
          >
            Submit Review ✅
          </button>
        </div>

        <!-- List -->
        <div v-if="reviews.length > 0" class="space-y-4">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="pb-4"
            style="border-bottom: 1px solid var(--border)"
          >
            <div class="flex items-center justify-between mb-2">
              <p class="font-bold" style="color: var(--text-primary)">
                {{ review.name }}
              </p>
              <p class="text-sm" style="color: var(--text-secondary)">
                {{ review.date }}
              </p>
            </div>
            <div class="flex gap-1 mb-2">
              <span
                v-for="star in 5"
                :key="star"
                :class="
                  star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                "
                >★</span
              >
            </div>
            <p style="color: var(--text-secondary)">{{ review.comment }}</p>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <p class="text-4xl mb-2">⭐</p>
          <p style="color: var(--text-secondary)">
            No reviews yet — be the first!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '@/composables/useCart.js';
import { useSEO } from '@/composables/useSEO';
import { useToast } from '@/composables/useToast.js';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { addToast } = useToast();
const { addToCart } = useCart();

const product = ref(null);
const allProducts = ref([]);
const loading = ref(true);
const currentImage = ref(0);
const quantity = ref(1);
const reviews = ref([]);
const newReview = ref({ name: '', rating: 0, comment: '' });

const images = computed(() => product.value?.images || []);

const relatedProducts = computed(() => {
  if (!product.value) return [];
  return allProducts.value.filter(
    (p) => p.category === product.value.category && p.id !== product.value.id
  );
});

const increaseQty = () => quantity.value++;

const decreaseQty = () => {
  if (quantity.value > 1) quantity.value--;
};

const prevImage = () => {
  currentImage.value =
    currentImage.value > 0 ? currentImage.value - 1 : images.value.length - 1;
};

const nextImage = () => {
  currentImage.value =
    currentImage.value < images.value.length - 1 ? currentImage.value + 1 : 0;
};

const setRating = (star) => {
  newReview.value.rating = star;
};

const fetchProduct = async () => {
  try {
    loading.value = true;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
    const data = await res.json();
    allProducts.value = data.data;
    product.value = data.data.find(
      (p) => p.name.toLowerCase().replaceAll(' ', '-') === route.params.slug
    );
    if (product.value) fetchReviews();
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const fetchReviews = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/reviews/${product.value.id}`
    );
    const data = await res.json();
    reviews.value = data.data;
  } catch (e) {
    console.error(e);
  }
};

const submitReview = async () => {
  if (
    !newReview.value.name ||
    !newReview.value.comment ||
    !newReview.value.rating
  ) {
    addToast('Please fill all fields and select a rating!', 'error');
    return;
  }
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/reviews/${product.value.id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview.value),
      }
    );
    const data = await res.json();
    reviews.value.push(data.data);
    newReview.value = { name: '', rating: 0, comment: '' };
    addToast('Review submitted! ⭐', 'success');
  } catch {
    addToast('Failed to submit review!', 'error');
  }
};

const handleAddToCart = () => {
  addToCart(
    { ...product.value, image: product.value.images?.[0] },
    quantity.value
  );
  addToast(
    `${product.value.name} × ${quantity.value} added to cart! 🛒`,
    'success'
  );
};

const handleBuyNow = () => {
  addToCart(
    { ...product.value, image: product.value.images?.[0] },
    quantity.value
  );
  route.push('/checkout');
};

const goToProduct = (r) =>
  router.push(`/product/${r.name.toLowerCase().replaceAll(' ', '-')}`);

watch(
  () => route.params.slug,
  () => {
    currentImage.value = 0;
    quantity.value = 1;
    fetchProduct();
  }
);

onMounted(() => fetchProduct());

const seoData = computed(() => {
  if (!product.value) return {};

  return {
    title: `Buy ${product.value.name} Online — Pure & Natural`,
    description:
      product.value.description?.slice(0, 140) ||
      `Buy pure ${product.value.name} online from Aroma Spices.`,
    image: `https://aromaspicies.com/images/${product.value.image}`,
    url: `https://aromaspicies.com/product/${route.params.slug}`,
    type: 'product',
  };
});

useSEO(seoData.value);
</script>
