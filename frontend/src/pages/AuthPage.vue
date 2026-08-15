<template>
  <div
    class="min-h-screen flex items-center justify-center bg-ocean-gradient px-4 py-10"
  >
    <div
      class="relative overflow-hidden bg-ocean-800/90 backdrop-blur-xl border border-ocean-700 rounded-[30px] shadow-2xl w-full max-w-5xl min-h-[780px]"
    >
      <!-- LOG IN -->
      <div
        :class="[
          'absolute top-0 left-0 w-1/2 h-full transition-all duration-700',
          isActive
            ? 'translate-x-full opacity-0 z-10'
            : 'translate-x-0 opacity-100 z-20',
        ]"
      >
        <form
          @submit.prevent="handleLogin"
          class="flex flex-col items-center justify-center h-full px-12"
        >
          <h1 class="text-4xl font-bold mb-6 text-sand-100">Log In</h1>

          <input
            id="login-email"
            name="email"
            v-model="loginForm.email"
            type="email"
            autocomplete="email"
            aria-label="Login email"
            placeholder="Email"
            class="w-full bg-ocean-700 border border-ocean-600 text-sand-100 placeholder:text-sand-400 rounded-xl px-4 py-3 mb-4 outline-none focus:border-sand-300 transition"
          />
          <input
            id="login-password"
            name="password"
            v-model="loginForm.password"
            type="password"
            autocomplete="current-password"
            aria-label="Login password"
            placeholder="Password"
            class="w-full bg-ocean-700 border border-ocean-600 text-sand-100 placeholder:text-sand-400 rounded-xl px-4 py-3 mb-4 outline-none focus:border-sand-300 transition"
            @keyup.enter="handleLogin"
          />
          <RouterLink
            to="/forgot-password"
            class="text-sm text-sand-300 hover:text-sand-100 transition mb-5"
          >
            Forgot your password?
          </RouterLink>

          <TurnstileWidget
            ref="loginTurnstile"
            @verified="(token) => (loginTurnstileToken = token)"
          />

          <p v-if="loginError" class="text-xs mb-3 mt-2" style="color: #f87171">
            {{ loginError }}
          </p>

          <button
            type="submit"
            :disabled="loginLoading"
            class="bg-ocean-300 hover:bg-ocean-200 text-ocean-900 px-10 py-3 rounded-xl uppercase text-sm font-bold tracking-wider transition duration-300 disabled:opacity-50 mt-3"
          >
            {{ loginLoading ? 'Signing in...' : 'Log In' }}
          </button>
        </form>
      </div>

      <!-- SIGN UP -->
      <div
        :class="[
          'absolute top-0 left-0 w-1/2 h-full transition-all duration-700',
          isActive
            ? 'translate-x-full opacity-100 z-30'
            : 'translate-x-0 opacity-0 z-10',
        ]"
      >
        <form
          @submit.prevent="handleSignup"
          class="flex flex-col items-center justify-center h-full px-12"
        >
          <h1 class="text-3xl font-bold mb-5 text-sand-100">Create Account</h1>

          <!-- Name + Email row -->
          <div class="flex gap-3 w-full mb-3">
            <input
              id="signup-name"
              name="name"
              v-model="signupForm.name"
              type="text"
              autocomplete="name"
              aria-label="Full name"
              placeholder="Full Name"
              class="flex-1 bg-ocean-700 border border-ocean-600 text-sand-100 placeholder:text-sand-400 rounded-xl px-4 py-2.5 outline-none focus:border-sand-300 transition text-sm"
            />
            <input
              id="signup-email"
              name="email"
              v-model="signupForm.email"
              type="email"
              autocomplete="email"
              aria-label="Email address"
              placeholder="Email"
              class="flex-1 bg-ocean-700 border border-ocean-600 text-sand-100 placeholder:text-sand-400 rounded-xl px-4 py-2.5 outline-none focus:border-sand-300 transition text-sm"
            />
          </div>

          <!-- Phone with country code -->
          <div class="flex gap-2 w-full mb-3">
            <select
              id="signup-country-code"
              name="countryCode"
              v-model="signupForm.countryCode"
              aria-label="Country code"
              class="bg-ocean-700 border border-ocean-600 text-sand-100 rounded-xl px-2 py-2.5 outline-none focus:border-sand-300 transition text-sm w-[110px] flex-shrink-0"
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+61">🇦🇺 +61</option>
              <option value="+971">🇦🇪 +971</option>
              <option value="+65">🇸🇬 +65</option>
              <option value="+60">🇲🇾 +60</option>
              <option value="+880">🇧🇩 +880</option>
              <option value="+92">🇵🇰 +92</option>
              <option value="+977">🇳🇵 +977</option>
            </select>
            <input
              id="signup-phone"
              name="phone"
              v-model="signupForm.phone"
              type="tel"
              autocomplete="tel"
              aria-label="Phone number"
              placeholder="Phone Number"
              class="flex-1 bg-ocean-700 border border-ocean-600 text-sand-100 placeholder:text-sand-400 rounded-xl px-4 py-2.5 outline-none focus:border-sand-300 transition text-sm"
            />
          </div>

          <!-- Address -->
          <div class="w-full mb-3">
            <input
              id="signup-address"
              name="address"
              v-model="signupForm.address"
              type="text"
              autocomplete="street-address"
              aria-label="Delivery address"
              placeholder="Delivery Address"
              class="w-full bg-ocean-700 border border-ocean-600 text-sand-100 placeholder:text-sand-400 rounded-xl px-4 py-2.5 outline-none focus:border-sand-300 transition text-sm"
            />
          </div>

          <div class="flex gap-3 w-full mb-3">
            <input
              id="signup-password"
              name="password"
              v-model="signupForm.password"
              type="password"
              autocomplete="new-password"
              aria-label="Password"
              placeholder="Password (min 6)"
              class="flex-1 bg-ocean-700 border border-ocean-600 text-sand-100 placeholder:text-sand-400 rounded-xl px-4 py-2.5 outline-none focus:border-sand-300 transition text-sm"
            />
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              v-model="signupForm.confirmPassword"
              type="password"
              autocomplete="new-password"
              aria-label="Confirm password"
              placeholder="Confirm Password"
              class="flex-1 bg-ocean-700 border border-ocean-600 text-sand-100 placeholder:text-sand-400 rounded-xl px-4 py-2.5 outline-none focus:border-sand-300 transition text-sm"
              @keyup.enter="handleSignup"
            />
          </div>

          <TurnstileWidget
            ref="signupTurnstile"
            @verified="(token) => (signupTurnstileToken = token)"
          />

          <p
            v-if="signupError"
            class="text-xs mb-3 mt-2"
            style="color: #f87171"
          >
            {{ signupError }}
          </p>

          <button
            type="submit"
            :disabled="signupLoading"
            class="bg-ocean-300 hover:bg-ocean-200 text-ocean-900 px-10 py-3 rounded-xl uppercase text-sm font-bold tracking-wider transition duration-300 disabled:opacity-50 mt-3"
          >
            {{ signupLoading ? 'Creating...' : 'Sign Up' }}
          </button>
        </form>
      </div>

      <!-- TOGGLE CONTAINER -->
      <div
        :class="
          isActive
            ? '-translate-x-full rounded-r-[150px]'
            : 'translate-x-0 rounded-l-[150px]'
        "
        class="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 z-50"
      >
        <div
          :class="isActive ? 'translate-x-1/2' : 'translate-x-0'"
          class="relative left-[-100%] w-[200%] h-full bg-ocean-gradient text-white transition-all duration-700"
        >
          <!-- LEFT PANEL -->
          <div
            class="absolute w-1/2 h-full flex flex-col justify-center items-center text-center px-10"
          >
            <h1 class="text-5xl font-bold mb-5 text-sand-100">Welcome Back!</h1>
            <p class="mb-6 text-sand-200 leading-relaxed">
              Enter your personal details to use all site features
            </p>
            <button
              @click="openLogin"
              class="border border-sand-100 text-sand-100 hover:bg-sand-100 hover:text-ocean-900 px-10 py-3 rounded-xl uppercase text-sm font-bold tracking-wider transition duration-300"
            >
              Log In
            </button>
          </div>

          <!-- RIGHT PANEL -->
          <div
            class="absolute right-0 w-1/2 h-full flex flex-col justify-center items-center text-center px-10"
          >
            <h1 class="text-5xl font-bold mb-5 text-sand-100">
              Hello, Friend!
            </h1>
            <p class="mb-6 text-sand-200 leading-relaxed">
              Register with your personal details to use all site features
            </p>
            <button
              @click="openRegister"
              class="border border-sand-100 text-sand-100 hover:bg-sand-100 hover:text-ocean-900 px-10 py-3 rounded-xl uppercase text-sm font-bold tracking-wider transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TurnstileWidget from '@/components/TurnstileWidget.vue';
import { useAuth } from '@/composables/useAuth.js';
import { useToast } from '@/composables/useToast.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { login, signup } = useAuth();
const { addToast } = useToast();

// Turnstile — separate refs for each form
const loginTurnstile = ref(null);
const loginTurnstileToken = ref('');
const signupTurnstile = ref(null);
const signupTurnstileToken = ref('');

const isActive = ref(false);
const openRegister = () => (isActive.value = true);
const openLogin = () => (isActive.value = false);

const loginForm = ref({ email: '', password: '' });
const loginLoading = ref(false);
const loginError = ref('');

const signupForm = ref({
  name: '',
  email: '',
  countryCode: '+91',
  phone: '',
  address: '',
  password: '',
  confirmPassword: '',
});
const signupLoading = ref(false);
const signupError = ref('');

const handleLogin = async () => {
  loginError.value = '';
  loginLoading.value = true;
  try {
    await login(
      loginForm.value.email,
      loginForm.value.password,
      loginTurnstileToken.value
    );
    addToast('Welcome back! 🌶️', 'success');
    router.push('/products');
  } catch (err) {
    loginError.value = err.message;
    loginTurnstile.value?.reset();
    loginTurnstileToken.value = '';
  } finally {
    loginLoading.value = false;
  }
};

const handleSignup = async () => {
  signupError.value = '';
  signupLoading.value = true;
  try {
    await signup(
      signupForm.value.name,
      signupForm.value.email,
      signupForm.value.password,
      signupForm.value.confirmPassword,
      `${signupForm.value.countryCode}${signupForm.value.phone}`,
      signupForm.value.address,
      signupTurnstileToken.value
    );
    addToast('Account created! Welcome 🌶️', 'success');
    router.push('/products');
  } catch (err) {
    signupError.value = err.message;
    signupTurnstile.value?.reset();
    signupTurnstileToken.value = '';
  } finally {
    signupLoading.value = false;
  }
};
</script>
