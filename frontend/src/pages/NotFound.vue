<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-4 text-center transition-colors duration-200"
    style="background: var(--bg-page)"
  >
    <p class="text-8xl mb-6">🌶️</p>
    <h1 class="text-6xl font-bold mb-2" style="color: var(--primary)">404</h1>
    <p class="text-2xl font-bold mb-2" style="color: var(--text-primary)">
      This spice isn't in our rack.
    </p>
    <p class="mb-8 max-w-sm" style="color: var(--text-secondary)">
      The page you're looking for doesn't exist or may have been moved.
    </p>
    <div class="flex gap-4">
      <RouterLink
        to="/"
        class="px-6 py-3 rounded-xl font-semibold text-white transition hover:opacity-90"
        style="background: var(--primary)"
        >Back to Home</RouterLink
      >
      <RouterLink
        to="/shop"
        class="px-6 py-3 rounded-xl font-semibold transition hover:opacity-70"
        style="border: 2px solid var(--primary); color: var(--primary)"
        >Browse Shop</RouterLink
      >
    </div>
  </div>
</template>
