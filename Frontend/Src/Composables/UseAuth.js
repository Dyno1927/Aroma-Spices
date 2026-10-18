/**
 * Authentication Composable
 * Manages user login, signup, token refresh, and user state
 */

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

// Global auth state
const user = ref(null);
const accessToken = ref(null);

/**
 * Auth composable hook
 * @returns {Object} Auth methods and computed properties
 */
export function useAuth() {
  const router = useRouter();
  const isLoggedIn = computed(() => !!accessToken.value);

  const setAuth = (userData, token) => {
    user.value = userData;
    accessToken.value = token;
  };

  const signup = async (
    name,
    email,
    password,
    confirmPassword,
    phone = '',
    address = '',
    turnstileToken = ''
  ) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
        phone,
        address,
        turnstileToken,
      }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    setAuth(data.data.user, data.data.accessToken);
    return data;
  };

  const login = async (email, password, turnstileToken = '') => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, turnstileToken }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    setAuth(data.data.user, data.data.accessToken);
    return data;
  };

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    user.value = null;
    accessToken.value = null;
    router.push('/auth');
  };

  const refreshAccessToken = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      const data = await res.json();
      if (!data.success) throw new Error();
      accessToken.value = data.data.accessToken;
      await fetchCurrentUser();
      return data.data.accessToken;
    } catch {
      user.value = null;
      accessToken.value = null;
      return null;
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${accessToken.value}` },
        credentials: 'include',
      });

      const data = await res.json();
      if (data.success) user.value = data.data.user;
    } catch (error) {
      console.error(error);
    }
  };

  const emailVerified = computed(() => user.value?.emailVerified ?? true);

  return {
    user,
    isLoggedIn,
    accessToken,
    signup,
    login,
    logout,
    refreshAccessToken,
    fetchCurrentUser,
    emailVerified,
  };
}
