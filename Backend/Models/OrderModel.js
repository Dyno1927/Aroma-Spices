/**
 * Order Management Schemas
 * Defines nested schemas for order items, delivery address, and complete orders
 */

import mongoose from 'mongoose';

/**
 * Order Item Schema - represents individual products in an order
 * @typedef {Object} OrderItem
 * @property {ObjectId} productId - Reference to Product document
 * @property {string} name - Product name at time of order
 * @property {string} image - Product image URL
 * @property {number} price - Price per unit
 * @property {number} quantity - Quantity ordered
 */
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

/**
 * Address Schema - delivery address information
 * @typedef {Object} Address
 * @property {string} name - Recipient name
 * @property {string} phoneNumber - Delivery phone
 * @property {string} address - Street address
 * @property {string} city - City name
 * @property {string} state - State name
 * @property {string} pincode - Postal code
 */
const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});

/**
 * Order Schema - complete order with payment details
 * @typedef {Object} Order
 * @property {ObjectId} userId - User ID (null for guest orders)
 * @property {string} guestEmail - Email for guest orders
 * @property {OrderItem[]} items - Array of order items
 * @property {number} amountInPaise - Total in paise (₹1 = 100 paise)
 * @property {string} currency - Currency code (default: INR)
 * @property {string} status - Order status (Pending/Paid/Failed/Cancelled/Refunded)
 * @property {string} razorpayOrderId - Razorpay order reference
 * @property {string} razorpayPaymentId - Razorpay payment reference
 * @property {string} razorpaySignature - Payment signature for verification
 * @property {Address} address - Delivery address
 * @property {Date} createdAt - Order creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    guestEmail: {
      type: String,
      default: null,
    },
    items: [orderItemSchema],
    amountInPaise: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Cancelled', 'Refunded'],
      default: 'Pending',
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    address: addressSchema,
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ razorpayOrderId: 1 });
orderItemSchema.index({ userId: 1 });

export default mongoose.model('Order', orderSchema);
