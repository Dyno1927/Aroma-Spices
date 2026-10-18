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
    component: () => import('@/Pages/LandingPage.vue'),
    meta: {
      hideLayout: true,
    },
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/Pages/ShopPage.vue'),
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/Pages/ProductsPage.vue'),
  },
  {
    path: '/product/:slug',
    name: 'Product',
    component: () => import('@/Pages/ProductPage.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/Pages/AboutPage.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/Pages/ContactPage.vue'),
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/Pages/AuthPage.vue'),
  },
  {
    path: '/verify-email',
    name: 'VerifyEmail',
    component: () => import('@/Pages/VerifyEmailPage.vue'),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/Pages/CheckoutPage.vue'),
  },
  {
    path: '/order-confirm',
    name: 'OrderConfirm',
    component: () => import('@/Pages/OrderConfirmPage.vue'),
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import('@/Pages/ServerError.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/Pages/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
