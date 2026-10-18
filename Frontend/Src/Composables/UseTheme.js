/**
 * Theme Management Composable
 * Handles light/dark mode switching and persistence in localStorage
 */

import { ref } from 'vue';

// Persisted theme preference
const theme = ref(localStorage.getItem('theme') || 'system');

/**
 * Theme toggle and management
 * Supports three modes: 'light', 'dark', or 'system' (respects OS preference)
 * @returns {Object} Theme state and control methods
 */
export function useTheme() {
  const applyTheme = (value) => {
    const root = document.documentElement;
    if (value === 'dark') {
      root.classList.add('dark');
    } else if (value === 'light') {
      root.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      root.classList.toggle('dark', prefersDark);
    }
  };

  const setTheme = (value) => {
    theme.value = value;
    localStorage.setItem('theme', value);
    applyTheme(value);
  };

  const initTheme = () => {
    applyTheme(theme.value);
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if (theme.value === 'system') applyTheme('system');
      });
  };

  return { theme, setTheme, initTheme };
}
