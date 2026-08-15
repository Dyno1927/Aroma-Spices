<template>
  <div
    class="min-h-screen transition-colors duration-200"
    style="background: var(--bg-page)"
  >
    <section
      class="py-20 px-4 text-center text-white"
      style="background: #1e3a5f"
    >
      <h1 class="text-4xl font-bold mb-3">About Aroma Spices</h1>
      <p style="color: rgba(168, 197, 214, 0.8)">
        Pure Taste • Rich Aroma • Natural Goodness
      </p>
    </section>

    <section class="max-w-4xl mx-auto px-4 py-16">
      <div class="rounded-2xl shadow-md p-8" style="background: var(--bg-card)">
        <h2 class="text-3xl font-bold mb-6" style="color: var(--primary)">
          🌿 Our Story
        </h2>
        <p class="leading-relaxed mb-4" style="color: var(--text-secondary)">
          Aroma Spices was born from a simple dream — to bring pure, natural,
          and affordable spices directly to every Indian household. Founded by
          <strong style="color: var(--text-primary)">Amit Kumar</strong>, a
          family man from
          <strong style="color: var(--text-primary)"
            >Aligarh, Uttar Pradesh</strong
          >, our journey began with a heartfelt mission: no compromises on
          quality, no artificial additives, and no unfair prices.
        </p>
        <p class="leading-relaxed" style="color: var(--text-secondary)">
          What started as a family initiative has quickly grown into a trusted
          brand. We work directly with local farmers to source the finest spices
          and honey, cutting out the middlemen so you get the best quality at
          the most affordable prices.
        </p>
      </div>
    </section>

    <section class="py-16 px-4" style="background: var(--bg-surface)">
      <div class="max-w-4xl mx-auto">
        <h2
          class="text-3xl font-bold mb-10 text-center"
          style="color: var(--primary)"
        >
          💚 Why Choose Aroma Spices?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="item in whyUs"
            :key="item.title"
            class="rounded-xl p-6"
            style="
              background: var(--bg-card);
              border-left: 4px solid var(--primary);
            "
          >
            <h3
              class="text-xl font-bold mb-2"
              style="color: var(--text-primary)"
            >
              {{ item.icon }} {{ item.title }}
            </h3>
            <p style="color: var(--text-secondary)">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-4 py-16">
      <h2
        class="text-3xl font-bold mb-10 text-center"
        style="color: var(--primary)"
      >
        ⭐ Our Values
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div
          v-for="value in values"
          :key="value.title"
          class="rounded-xl shadow p-6"
          style="background: var(--bg-card)"
        >
          <p class="text-4xl mb-4">{{ value.icon }}</p>
          <h3 class="text-lg font-bold mb-2" style="color: var(--text-primary)">
            {{ value.title }}
          </h3>
          <p class="text-sm" style="color: var(--text-secondary)">
            {{ value.desc }}
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 px-4" style="background: var(--bg-surface)">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold mb-8" style="color: var(--primary)">
          📄 Terms & Policy
        </h2>
        <div class="space-y-6">
          <div v-for="policy in policies" :key="policy.title">
            <h3
              class="text-lg font-bold mb-2"
              style="color: var(--text-primary)"
            >
              {{ policy.title }}
            </h3>
            <p style="color: var(--text-secondary)">{{ policy.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <footer
      class="py-8 px-4 text-center text-white"
      style="background: #1e3a5f"
    >
      <p class="font-bold text-lg mb-1">🌶️ Aroma Spices</p>
      <p style="opacity: 0.6; font-size: 0.875rem">
        Aligarh, Uttar Pradesh, India — Pure Taste • Rich Aroma • Natural
        Goodness
      </p>
    </footer>
  </div>
</template>

<script setup>
import { useSEO } from '@/composables/useSEO.js';

useSEO({
  title: 'About Us — Our Story',
  description:
    'Aroma Spices is a family-run spice business from Aligarh, UP. Bringing pure, natural Indian spices to your kitchen since day one.',
  url: 'https://aromaspicies.com/about',
});

const whyUs = [
  {
    icon: '🌱',
    title: '100% Organic',
    desc: 'All our spices are naturally grown with no artificial colors, preservatives, or additives.',
  },
  {
    icon: '👨‍🌾',
    title: 'Direct from Farmers',
    desc: 'We source directly from trusted local farmers across India, ensuring freshness and fair support.',
  },
  {
    icon: '💰',
    title: 'Affordable Prices',
    desc: "Quality shouldn't be a luxury. Our prices are kept fair so every household can enjoy premium spices.",
  },
  {
    icon: '📦',
    title: 'Hygienically Packed',
    desc: 'Every product is cleaned, processed, and packed under hygienic conditions to maintain quality.',
  },
];

const values = [
  {
    icon: '🤝',
    title: 'Trust',
    desc: 'We build honest relationships with our farmers, partners, and customers.',
  },
  {
    icon: '🌿',
    title: 'Purity',
    desc: 'No shortcuts. No artificial ingredients. Just pure, natural goodness.',
  },
  {
    icon: '❤️',
    title: 'Family',
    desc: 'A family business built with love, dedication, and a passion for quality food.',
  },
];

const policies = [
  {
    title: 'Returns & Refunds',
    desc: 'If you receive a damaged or incorrect product, contact us within 48 hours. We will arrange a replacement or full refund.',
  },
  {
    title: 'Product Quality',
    desc: 'All Aroma Spices products are 100% natural and free from artificial colors, flavors, and preservatives.',
  },
  {
    title: 'Privacy Policy',
    desc: 'Your personal information is used only for order processing and delivery. We never share your data with third parties.',
  },
  {
    title: 'Shipping Policy',
    desc: 'We deliver across India. Orders are processed within 1-2 business days and delivered within 5-7 business days. Free shipping above ₹500.',
  },
];
</script>
