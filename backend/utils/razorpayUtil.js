/**
 * Razorpay Payment Gateway Configuration
 * Initializes and exports Razorpay instance for payment processing
 */

import Razorpay from 'razorpay';

/**
 * Razorpay instance configured with API credentials
 * Used for creating orders and verifying payments
 */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;
