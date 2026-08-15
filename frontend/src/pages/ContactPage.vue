<template>
  <div
    class="min-h-screen transition-colors duration-200"
    style="background: var(--bg-page)"
  >
    <!-- Hero -->
    <section class="py-16 px-4 text-white" style="background: #1e3a5f">
      <div
        class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div>
          <h1 class="text-4xl font-bold mb-3">Get In Touch</h1>
          <p class="max-w-md text-lg" style="color: rgba(168, 197, 214, 0.8)">
            Have a question about our spices, an order, or just want to say
            hello? We're here and happy to help.
          </p>
        </div>

        <div class="flex gap-6 text-center">
          <div class="flex flex-col items-center">
            <span class="text-3xl font-bold">24h</span>
            <span class="text-xs mt-1" style="color: rgba(168, 197, 214, 0.7)"
              >Avg Reply Time</span
            >
          </div>
          <div class="w-px" style="background: rgba(168, 197, 214, 0.2)"></div>
          <div class="flex flex-col items-center">
            <span class="text-3xl font-bold">100%</span>
            <span class="text-xs mt-1" style="color: rgba(168, 197, 214, 0.7)"
              >Response Rate</span
            >
          </div>
          <div class="w-px" style="background: rgba(168, 197, 214, 0.2)"></div>
          <div class="flex flex-col items-center">
            <span class="text-3xl font-bold">5★</span>
            <span class="text-xs mt-1" style="color: rgba(168, 197, 214, 0.7)"
              >Service Rating</span
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Main Grid -->
    <section class="max-w-4xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Contact Details -->
        <div
          class="rounded-2xl shadow-md p-8"
          style="background: var(--bg-card)"
        >
          <h2 class="text-xl font-bold mb-6" style="color: var(--primary)">
            📬 Contact Details
          </h2>

          <div class="space-y-5">
            <div
              v-for="item in contactItems"
              :key="item.label"
              class="flex gap-4"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                style="background: var(--bg-surface)"
              >
                {{ item.icon }}
              </div>
              <div>
                <p
                  class="text-xs font-bold uppercase tracking-wide mb-1"
                  style="color: var(--text-secondary)"
                >
                  {{ item.label }}
                </p>
                <template v-if="item.links">
                  <a
                    v-for="link in item.links"
                    :key="link.text"
                    :href="link.href"
                    :target="link.external ? '_blank' : undefined"
                    :rel="link.external ? 'noopener noreferrer' : undefined"
                    class="block text-sm font-medium hover:opacity-60 transition"
                    style="color: var(--primary)"
                  >
                    {{ link.text }}
                  </a>
                </template>
                <p
                  v-else
                  class="text-sm font-medium"
                  style="color: var(--text-primary)"
                >
                  {{ item.value }}
                </p>
              </div>
            </div>
          </div>

          <!-- Business Hours -->
          <div class="mt-8 pt-6" style="border-top: 1px solid var(--border)">
            <h3
              class="text-sm font-bold uppercase tracking-wide mb-4"
              style="color: var(--text-secondary)"
            >
              🕐 Business Hours
            </h3>
            <div class="space-y-2">
              <div
                v-for="hour in businessHours"
                :key="hour.day"
                class="flex justify-between text-sm"
              >
                <span style="color: var(--text-secondary)">{{ hour.day }}</span>
                <span class="font-medium" style="color: var(--text-primary)">{{
                  hour.time
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div
          class="rounded-2xl shadow-md p-8"
          style="background: var(--bg-card)"
        >
          <h2 class="text-xl font-bold mb-6" style="color: var(--primary)">
            ✉️ Send a Message
          </h2>

          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label
                for="contact-name"
                class="block text-xs font-bold uppercase tracking-wide mb-1.5"
                style="color: var(--text-secondary)"
              >
                Your Name
              </label>
              <input
                id="contact-name"
                name="name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                aria-label="Your name"
                placeholder="Enter your name"
                class="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition"
                style="
                  background: var(--bg-surface);
                  color: var(--text-primary);
                  border: 1px solid var(--border);
                "
              />
            </div>

            <div>
              <label
                for="contact-email"
                class="block text-xs font-bold uppercase tracking-wide mb-1.5"
                style="color: var(--text-secondary)"
              >
                Email Address
              </label>
              <input
                id="contact-email"
                name="email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                aria-label="Email address"
                placeholder="Enter your email"
                class="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition"
                style="
                  background: var(--bg-surface);
                  color: var(--text-primary);
                  border: 1px solid var(--border);
                "
              />
            </div>

            <div>
              <label
                for="contact-subject"
                class="block text-xs font-bold uppercase tracking-wide mb-1.5"
                style="color: var(--text-secondary)"
              >
                Subject
              </label>
              <select
                id="contact-subject"
                name="subject"
                v-model="form.subject"
                aria-label="Subject"
                class="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition"
                style="
                  background: var(--bg-surface);
                  color: var(--text-primary);
                  border: 1px solid var(--border);
                "
              >
                <option value="">Select a topic</option>
                <option>Order Inquiry</option>
                <option>Product Question</option>
                <option>Wholesale / Bulk Order</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label
                for="contact-message"
                class="block text-xs font-bold uppercase tracking-wide mb-1.5"
                style="color: var(--text-secondary)"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                v-model="form.message"
                rows="4"
                maxlength="1000"
                autocomplete="off"
                aria-label="Message"
                placeholder="Write your message..."
                class="w-full px-4 py-2.5 rounded-xl text-sm resize-none focus:outline-none transition"
                style="
                  background: var(--bg-surface);
                  color: var(--text-primary);
                  border: 1px solid var(--border);
                "
              ></textarea>
              <p
                class="text-xs mt-1 text-right"
                style="color: var(--text-secondary)"
              >
                {{ form.message.length }}/1000
              </p>
            </div>

            <!-- Turnstile -->
            <TurnstileWidget
              ref="turnstile"
              @verified="(token) => (turnstileToken = token)"
            />

            <button
              type="submit"
              :disabled="submitting || !turnstileToken"
              class="w-full text-white py-3 rounded-xl font-bold transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style="background: var(--primary)"
            >
              <span
                v-if="submitting"
                class="flex items-center justify-center gap-2"
              >
                <span
                  class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                ></span>
                Sending...
              </span>
              <span v-else>Send Message 📨</span>
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-12 px-4" style="background: var(--bg-surface)">
      <div class="max-w-4xl mx-auto">
        <h2
          class="text-2xl font-bold mb-8 text-center"
          style="color: var(--primary)"
        >
          Frequently Asked Questions
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="faq in faqs"
            :key="faq.q"
            class="rounded-xl p-5"
            style="background: var(--bg-card)"
          >
            <h3 class="font-bold mb-2" style="color: var(--text-primary)">
              {{ faq.q }}
            </h3>
            <p
              class="text-sm leading-relaxed"
              style="color: var(--text-secondary)"
            >
              {{ faq.a }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="py-8 px-4 text-center text-white"
      style="background: #1e3a5f"
    >
      <p class="font-bold text-lg mb-1">🌶️ Aroma Spices</p>
      <p style="opacity: 0.6; font-size: 0.875rem">
        Pure Taste • Rich Aroma • Natural Goodness | Aligarh, Uttar Pradesh,
        India
      </p>
    </footer>
  </div>
</template>

<script setup>
import TurnstileWidget from '@/components/TurnstileWidget.vue';
import { useSEO } from '@/composables/useSEO.js';
import { useToast } from '@/composables/useToast.js';
import { ref } from 'vue';

useSEO({
  title: 'Contact Us',
  description:
    "Get in touch with Aroma Spices. WhatsApp, email or visit us in Aligarh, UP. We'd love to hear from you.",
  url: 'https://aromaspicies.com/contact',
});

const { addToast } = useToast();

const submitting = ref(false);
const turnstile = ref(null);
const turnstileToken = ref('');

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const contactItems = [
  {
    icon: '📞',
    label: 'Phone',
    links: [{ text: '+91 9219546623', href: 'tel:+919219546623' }],
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    links: [
      {
        text: 'Chat on WhatsApp',
        href: 'https://wa.me/919105067555',
        external: true,
      },
    ],
  },
  {
    icon: '📧',
    label: 'Email',
    links: [
      {
        text: 'amitkumar@aromaspicies.com',
        href: 'mailto:amitkumar@aromaspicies.com',
      },
    ],
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Aligarh, Uttar Pradesh, India',
  },
  {
    icon: '📱',
    label: 'Social Media',
    links: [
      {
        text: 'Instagram — @Aroma_Spicies',
        href: 'https://instagram.com/Aroma_Spices',
        external: true,
      },
      {
        text: 'Facebook — Aroma Spicies',
        href: 'https://facebook.com/AromaSpices',
        external: true,
      },
    ],
  },
];

const businessHours = [
  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
  { day: 'Saturday', time: '10:00 AM – 5:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

const faqs = [
  {
    q: 'How long does delivery take?',
    a: 'Orders are processed within 1–2 business days and delivered within 5–7 business days depending on your location.',
  },
  {
    q: 'Do you offer bulk / wholesale orders?',
    a: 'Yes! We offer special pricing for bulk orders. Contact us via WhatsApp or email with your requirements.',
  },
  {
    q: 'Are your products 100% natural?',
    a: 'Absolutely. All Aroma Spices products are free from artificial colors, preservatives, and additives.',
  },
  {
    q: 'What is your return policy?',
    a: 'If you receive a damaged or incorrect product, contact us within 48 hours and we will arrange a replacement or full refund.',
  },
  {
    q: 'Is there free shipping?',
    a: 'Yes, we offer free shipping on all orders above ₹500 across India.',
  },
  {
    q: 'How can I track my order?',
    a: 'Once your order is dispatched, we will send you a tracking link via WhatsApp and email.',
  },
];

const submitForm = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.value.name.trim() || form.value.name.trim().length < 2) {
    addToast('Please enter your name (min 2 characters).', 'error');
    return;
  }
  if (!emailRegex.test(form.value.email)) {
    addToast('Please enter a valid email address.', 'error');
    return;
  }
  if (form.value.message.trim().length < 10) {
    addToast('Message must be at least 10 characters.', 'error');
    return;
  }

  submitting.value = true;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form.value,
        turnstileToken: turnstileToken.value,
      }),
    });

    if (!res.ok) throw new Error('Request failed');
    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    addToast("Message sent! We'll reply within 24h 📨", 'success');
    form.value = { name: '', email: '', subject: '', message: '' };
    turnstile.value?.reset();
    turnstileToken.value = '';
  } catch (err) {
    console.error('Contact form error:', err);
    addToast('Failed to send. Please WhatsApp us directly!', 'error');
    turnstile.value?.reset();
    turnstileToken.value = '';
  } finally {
    submitting.value = false;
  }
};
</script>
