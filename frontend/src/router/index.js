/**
 * Vue Router Configuration
 * Defines all application routes with dynamic imports for code splitting
 */

import { createRouter, createWebHistory } from 'vue-router';

/**
 * Route definitions with lazy loading
 * Each page is dynamically imported to optimize bundle size
n */
const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/pages/LandingPage.vue'),
    meta: {
      hideLayout: true,
    },
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/pages/ShopPage.vue'),
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/pages/ProductsPage.vue'),
  },
  {
    path: '/product/:slug',
    name: 'Product',
    component: () => import('@/pages/ProductPage.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/AboutPage.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/ContactPage.vue'),
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/pages/AuthPage.vue'),
  },
  {
    path: '/verify-email',
    name: 'VerifyEmail',
    component: () => import('@/pages/VerifyEmailPage.vue'),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/pages/CheckoutPage.vue'),
  },
  {
    path: '/order-confirm',
    name: 'OrderConfirm',
    component: () => import('@/pages/OrderConfirmPage.vue'),
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import('@/pages/ServerError.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
