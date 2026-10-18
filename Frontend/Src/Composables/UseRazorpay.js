/**
 * Razorpay Payment Gateway Composable
 * Loads Razorpay script dynamically and initializes payment checkout
 */

import { useScriptTag } from '@vueuse/core';

/**
 * Initialize Razorpay payment processing
 * @returns {Object} Payment methods for handling Razorpay checkout
 */
export const useRazorpay = () => {
  const { load } = useScriptTag(
    'https://checkout.razorpay.com/v1/checkout.js',
    () => {},
    { manual: true, defer: true }
  );

  const openPayment = async ({ order, prefill, onSuccess, onFailure }) => {
    if (!window.Razorpay) {
      await load();
    }

    const options = {
      key: order.keyId,
      amount: order.amount,
      currency: order.currency || 'INR',
      name: 'Aroma Spices',
      description: 'Pure Taste • Rich Aroma • Natural Goodness',
      image: '/images/Icon.png',
      order_id: order.razorpayOrderId,

      prefill: {
        name: prefill?.name || '',
        email: prefill?.email || '',
        contact: prefill?.phone || '',
      },

      theme: { color: '#1E3A5F' },

      handler: (response) => onSuccess?.(response),

      modal: {
        ondismiss: () => onFailure?.('Payment cancelled'),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (r) => onFailure?.(r.error.description));
    rzp.open();
  };

  return { openPayment };
};
