<template>
  <div class="min-h-screen bg-[var(--bg-page)] py-10 px-4">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-2xl font-bold text-[var(--primary)] mb-8">Checkout</h1>

      <!-- Empty cart guard -->
      <div v-if="!cart?.length" class="text-center py-20">
        <p class="text-[var(--text-muted)] mb-4">Your cart is empty.</p>
        <RouterLink
          to="/shop"
          class="px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition"
        >
          Browse Products
        </RouterLink>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-8">
        <!-- LEFT — Delivery Details -->
        <div class="flex-1 space-y-6">
          <div class="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-[var(--text-primary)] mb-5">
              Delivery Details
            </h2>

            <!-- Guest email -->
            <div v-if="!isLoggedIn" class="mb-4">
              <label
                for="checkout-email"
                class="block text-sm text-[var(--text-secondary)] mb-1"
                >Email</label
              >
              <input
                id="checkout-email"
                name="email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                aria-label="Email address"
                placeholder="your@email.com"
                class="input-field"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  for="checkout-name"
                  class="block text-sm text-[var(--text-secondary)] mb-1"
                  >Full Name</label
                >
                <input
                  id="checkout-name"
                  name="name"
                  v-model="form.name"
                  type="text"
                  autocomplete="name"
                  aria-label="Full name"
                  placeholder="e.g. Joe"
                  class="input-field"
                />
              </div>
              <div>
                <label
                  for="checkout-phone"
                  class="block text-sm text-[var(--text-secondary)] mb-1"
                  >Phone</label
                >
                <input
                  id="checkout-phone"
                  name="phone"
                  v-model="form.phone"
                  type="tel"
                  autocomplete="tel"
                  aria-label="Phone number"
                  placeholder="e.g. 1234567890"
                  class="input-field"
                />
              </div>
              <div class="sm:col-span-2">
                <label
                  for="checkout-address-line"
                  class="block text-sm text-[var(--text-secondary)] mb-1"
                  >Address Line</label
                >
                <input
                  id="checkout-address-line"
                  name="line1"
                  v-model="form.line1"
                  type="text"
                  autocomplete="street-address"
                  aria-label="Address line"
                  placeholder="e.g. house 123, street"
                  class="input-field"
                />
              </div>
              <div>
                <label
                  for="checkout-country"
                  class="block text-sm text-[var(--text-secondary)] mb-1"
                  >Country</label
                >
                <select
                  id="checkout-country"
                  name="country"
                  v-model="form.country"
                  @change="onCountryChange"
                  aria-label="Country"
                  class="input-field"
                >
                  <option value="">Select country</option>
                  <option value="India">India</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label
                  for="checkout-state"
                  class="block text-sm text-[var(--text-secondary)] mb-1"
                  >State</label
                >
                <select
                  id="checkout-state"
                  name="state"
                  v-model="form.state"
                  @change="onStateChange"
                  aria-label="State"
                  class="input-field"
                >
                  <option value="">Select state</option>
                  <option v-for="s in states" :key="s" :value="s">
                    {{ s }}
                  </option>
                </select>
              </div>
              <div>
                <label
                  for="checkout-city"
                  class="block text-sm text-[var(--text-secondary)] mb-1"
                  >City</label
                >
                <select
                  id="checkout-city"
                  name="city"
                  v-model="form.city"
                  aria-label="City"
                  class="input-field"
                >
                  <option value="">Select city</option>
                  <option v-for="c in cities" :key="c" :value="c">
                    {{ c }}
                  </option>
                </select>
              </div>
              <div>
                <label
                  for="checkout-pincode"
                  class="block text-sm text-[var(--text-secondary)] mb-1"
                  >Pincode</label
                >
                <input
                  id="checkout-pincode"
                  name="pincode"
                  v-model="form.pincode"
                  type="text"
                  autocomplete="postal-code"
                  aria-label="Postal code"
                  placeholder="202001"
                  class="input-field"
                />
              </div>
            </div>

            <!-- Save address toggle — logged in only -->
            <label
              v-if="isLoggedIn"
              class="flex items-center gap-2 mt-5 text-sm text-[var(--text-secondary)] cursor-pointer"
            >
              <input
                id="checkout-save-address"
                name="saveAddress"
                v-model="saveAddress"
                type="checkbox"
                aria-label="Save address to profile"
                class="accent-[var(--primary)]"
              />
              Save address to my profile
            </label>
          </div>
        </div>

        <!-- RIGHT — Order Summary -->
        <div class="lg:w-96">
          <div
            class="bg-[var(--bg-card)] rounded-2xl p-6 shadow-sm sticky top-6"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary)] mb-5">
              Order Summary
            </h2>

            <ul class="space-y-4 mb-6">
              <li
                v-for="item in cart"
                :key="item.id"
                class="flex items-center gap-3"
              >
                <img
                  :src="`/images/${item.image}`"
                  :alt="`${item.name} — Aroma Spices`"
                  class="w-12 h-12 rounded-lg object-cover"
                />
                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-medium text-[var(--text-primary)] truncate"
                  >
                    {{ item.name }}
                  </p>
                  <p class="text-xs text-[var(--text-secondary)]">
                    Qty: {{ item.quantity }}
                  </p>
                </div>
                <p class="text-sm font-semibold text-[var(--primary)]">
                  ₹{{ item.price * item.quantity }}
                </p>
              </li>
            </ul>

            <div class="border-t border-[var(--border)] pt-4 mb-6 space-y-2">
              <div
                class="flex justify-between text-sm text-[var(--text-secondary)]"
              >
                <span>Subtotal</span><span>₹{{ cartTotal }}</span>
              </div>
              <div
                class="flex justify-between text-sm text-[var(--text-secondary)]"
              >
                <span>Delivery</span>
                <span class="text-green-600 font-medium">Free</span>
              </div>
              <div
                class="flex justify-between text-base font-bold text-[var(--text-primary)] pt-2"
              >
                <span>Total</span><span>₹{{ cartTotal }}</span>
              </div>
            </div>

            <div class="mb-4">
              <TurnstileWidget
                ref="turnstile"
                @verified="(token) => (turnstileToken = token)"
              />
            </div>

            <p v-if="error" class="text-red-500 text-sm mb-3 text-center">
              {{ error }}
            </p>

            <button
              @click="handlePay"
              :disabled="loading || !turnstileToken"
              class="w-full py-3.5 bg-[var(--primary)] text-white font-semibold rounded-xl hover:opacity-90 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Processing...</span>
              <span v-else>Pay ₹{{ cartTotal }}</span>
            </button>

            <p class="text-xs text-center text-[var(--text-secondary)] mt-3">
              🔒 Secured by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import TurnstileWidget from '../components/TurnstileWidget.vue';
import { useAuth } from '../composables/useAuth.js';
import { useCart } from '../composables/useCart.js';
import { useRazorpay } from '../composables/useRazorpay.js';
import { useSEO } from '../composables/useSEO.js';
import { useToast } from '../composables/useToast.js';

useSEO({
  title: 'Checkout',
  description: 'Complete your order — Aroma Spices',
  url: 'https://aromaspicies.com/checkout',
});

const router = useRouter();
const { user, isLoggedIn, accessToken } = useAuth();
const { cart, cartTotal, clearCart } = useCart();
const { openPayment } = useRazorpay();

const loading = ref(false);
const error = ref('');
const saveAddress = ref(true);
const turnstile = ref(null);
const turnstileToken = ref('');

const form = reactive({
  email: '',
  name: '',
  phone: '',
  line1: '',
  country: '',
  city: '',
  state: '',
  pincode: '',
});

const states = [
  'Uttar Pradesh',
  'Maharashtra',
  'Karnataka',
  'Delhi',
  'West Bengal',
];

const citiesByState = {
  'Uttar Pradesh': ['Aligarh', 'Lucknow', 'Agra', 'Varanasi'],
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
  Karnataka: ['Bengaluru', 'Mysore'],
  Delhi: ['New Delhi'],
  'West Bengal': ['Kolkata'],
};

const cities = ref([]);

onMounted(() => {
  if (isLoggedIn.value && user.value) {
    form.name = user.value.name || '';
    form.phone = String(user.value.phone || '');
  }
  // initialize default states/cities if needed
  cities.value = [];
});

const validate = () => {
  const required = ['name', 'phone', 'line1', 'city', 'state', 'pincode'];
  if (!isLoggedIn.value) required.unshift('email');
  return required.every((f) => form[f].trim());
};

const { addToast } = useToast();

const onCountryChange = (e) => {
  if (form.country === 'Other') {
    const msg =
      'We are sorry, at this moment our services are only available in india. ' +
      '<a href="/contact" target="_blank" class="underline font-semibold">Contact Page</a>';
    addToast(msg, 'error');
    form.country = '';
  }
};

const openContactPage = () => {
  const url = '/contact';
  window.open(url, '_blank');
};

const onStateChange = () => {
  cities.value = citiesByState[form.state] || [];
  form.city = '';
};

const handlePay = async () => {
  error.value = '';
  if (!validate()) {
    error.value = 'Please fill in all delivery details.';
    return;
  }

  loading.value = true;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/orders/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(isLoggedIn.value && {
            Authorization: `Bearer ${accessToken.value}`,
          }),
        },
        credentials: 'include',
        body: JSON.stringify({
          items: cart.value.map((i) => ({
            productId: i._id,
            name: i.name,
            image: i.image,
            price: i.price,
            quantity: i.quantity,
          })),
          address: {
            name: form.name,
            phoneNumber: form.phone,
            address: form.line1,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
          },
          guestEmail: !isLoggedIn.value ? form.email : null,
          turnstileToken: turnstileToken.value,
        }),
      }
    );

    if (!res.ok) throw new Error('Failed to create order');
    const order = await res.json();

    await openPayment({
      order,
      prefill: {
        name: form.name,
        email: isLoggedIn.value ? user.value?.email : form.email,
        phone: form.phone,
      },
      onSuccess: async (response) => {
        await verifyPayment(response, order.orderId);
      },
      onFailure: (msg) => {
        error.value = msg;
        loading.value = false;
        turnstile.value?.reset();
        turnstileToken.value = '';
      },
    });
  } catch (err) {
    error.value = 'Something went wrong. Please try again.';
    loading.value = false;
    turnstile.value?.reset();
    turnstileToken.value = '';
  }
};

const verifyPayment = async (response, orderId) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/orders/verify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId,
        }),
      }
    );

    if (!res.ok) throw new Error('Verification failed');

    clearCart();
    router.push({ path: '/order-confirm', query: { orderId } });
  } catch {
    error.value = 'Payment received but verification failed. Contact support.';
    loading.value = false;
  }
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border-radius: 0.625rem;
  border: 1px solid var(--border);
  background: var(--bg-page);
  color: var(--text-primary);
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
}
.input-field:focus {
  border-color: var(--primary);
}
</style>
