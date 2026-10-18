/**
 * Toast Notification Composable
 * Manages toast notifications with auto-dismiss after 3 seconds
 */

import { ref } from 'vue';

// Global toast state
const toasts = ref([]);

/**
 * Toast notification composable
 * @returns {Object} Toast methods and state
 * @property {Ref<Array>} toasts - Array of active toast notifications
 * @property {Function} addToast - Add new toast (auto-dismisses after 3s)
 * @property {Function} removeToast - Manually remove toast by ID
 */
export function useToast() {
  function addToast(msg, type) {
    const newToast = { id: Date.now(), msg, type };
    toasts.value.push(newToast);
    setTimeout(() => removeToast(newToast.id), 3000);
  }

  function removeToast(id) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }

  return { toasts, addToast, removeToast };
}
