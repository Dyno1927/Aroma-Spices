<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[var(--bg-page)]"
  >
    <div class="text-center max-w-md px-6">
      <template v-if="status === 'loading'">
        <p class="text-[var(--text-muted)]">Verifying your email...</p>
      </template>

      <template v-else-if="status === 'success'">
        <div class="text-5xl mb-4">✅</div>
        <h1 class="text-2xl font-bold text-[var(--primary)] mb-2">
          Email Verified!
        </h1>
        <p class="text-[var(--text-muted)] mb-6">
          You're all set. Start shopping.
        </p>
        <router-link
          to="/products"
          class="px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition"
        >
          Shop Now
        </router-link>
      </template>

      <template v-else>
        <div class="text-5xl mb-4">❌</div>
        <h1 class="text-2xl font-bold text-red-500 mb-2">
          Link Invalid or Expired
        </h1>
        <p class="text-[var(--text-muted)] mb-6">
          Request a new verification link from your profile.
        </p>
        <router-link
          to="/"
          class="px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition"
        >
          Go Home
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const status = ref('loading');

onMounted(async () => {
  const token = route.query.token;
  if (!token) return (status.value = 'error');

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/verify-email/${token}`
    );
    status.value = res.ok ? 'success' : 'error';
  } catch (error) {
    console.error(error);
    status.value = 'error';
  }
});
</script>
