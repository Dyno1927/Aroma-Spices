/**
 * Sidebar Navigation Composable
 * Manages sidebar open/closed state with singleton pattern for app-wide consistency
 */

import { ref } from 'vue';

// Single shared instance across entire app
let sidebarInstance = null;

/**
 * Sidebar state composable with singleton pattern
 * @returns {Object} Sidebar state and control methods
 */
export const useSidebar = () => {
  if (!sidebarInstance) {
    const isOpen = ref(false);

    sidebarInstance = {
      isOpen,
      toggleSidebar: () => (isOpen.value = !isOpen.value),
      closeSidebar: () => (isOpen.value = false),
      openSidebar: () => (isOpen.value = true),
    };
  }

  return sidebarInstance;
};
