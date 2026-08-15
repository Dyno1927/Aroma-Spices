/**
 * Shopping Cart Composable
 * Manages cart state, item management, quantity updates, and totals
 */

import { computed, ref } from 'vue';

// Global cart state
const cart = ref([]);
const cartOpen = ref(false);

/**
 * Cart management composable
 * @returns {Object} Cart methods and computed properties
 * @property {Ref<Array>} cart - Array of cart items
 * @property {Ref<boolean>} cartOpen - Whether cart drawer is open
 * @property {ComputedRef<number>} cartCount - Total item count
 * @property {ComputedRef<number>} cartTotal - Total price
 */
export function useCart() {
  const cartCount = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const cartTotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const addToCart = (product, qty = 1) => {
    const existing = cart.value.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.value.push({ ...product, quantity: qty });
    }
  };

  const removeFromCart = (productId) => {
    cart.value = cart.value.filter((item) => item.id !== productId);
  };

  const increaseQty = (productId) => {
    const item = cart.value.find((item) => item.id === productId);
    if (item) item.quantity++;
  };

  const decreaseQty = (productId) => {
    const item = cart.value.find((item) => item.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity === 0) removeFromCart(productId);
    }
  };

  const clearCart = () => {
    cart.value = [];
  };

  const openCart = () => {
    cartOpen.value = true;
  };

  const closeCart = () => {
    cartOpen.value = false;
  };

  return {
    cart,
    cartOpen,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    openCart,
    closeCart,
  };
}
