/**
 * Order Controller
 * Manages order creation, payment verification, and order retrieval
 */

import crypto from 'crypto';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import { sendOrderConfirmationEmail } from '../utils/orderConfirmationEmailUtil.js';
import razorpay from '../utils/razorpayUtil.js';

/**
 * Create Razorpay order
 * Calculates order amount and creates Razorpay order for payment processing
 * Stores order in database with pending status
 *
 * @async
 * @param {Object} req - Express request with items, address, optional guestEmail
 * @param {Object} res - Express response
 * @returns {Object} Order details with Razorpay order ID for frontend payment
 */

// POST /api/orders/create
export const createOrder = async (req, res) => {
  const { items, address, guestEmail } = req.body;

  if (!items?.length)
    return res.status(400).json({ message: 'No items in order' });
  if (!address) return res.status(400).json({ message: 'Address is required' });

  const amountInPaise = Math.round(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100
  );

  const razorpayOrder = await razorpay.orders.create({
    amount: amountInPaise,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  });

  const order = await Order.create({
    userId: req.user?._id || null,
    guestEmail: guestEmail || null,
    items,
    amountInPaise,
    status: 'Pending',
    razorpayOrderId: razorpayOrder.id,
    address,
  });

  res.status(201).json({
    orderId: order._id,
    razorpayOrderId: razorpayOrder.id,
    amount: amountInPaise,
    currency: 'INR',
    keyId: process.env.RAZORPAY_KEY_ID,
  });
};

/**
 * Verify Razorpay payment signature
 * Validates payment authenticity using HMAC-SHA256
 * Marks order as paid and sends confirmation email on success
 *
 * @async
 * @param {Object} req - Razorpay payment details (order_id, payment_id, signature)
 * @param {Object} res - Express response
 * @returns {Object} Updated order with paid status
 */

// POST /api/orders/verify
export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
  } = req.body;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    await Order.findByIdAndUpdate(orderId, { status: 'Failed' });
    return res.status(400).json({ message: 'Payment verification failed' });
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      status: 'Paid',
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    },
    { new: true }
  );

  const email = order.userId
    ? (await User.findById(order.userId).select('email'))?.email
    : order.guestEmail;

  if (email) {
    sendOrderConfirmationEmail({ email, order }).catch((err) =>
      console.error('Order email failed:', err.message)
    );
  }

  res.json({ success: true, order });
};

/**
 * Get user's orders (authenticated only)
 * Retrieves all orders for the logged-in user, sorted by newest first
 *
 * @async
 * @param {Object} req - Express request with authenticated user
 * @param {Object} res - Express response
 * @returns {Object[]} Array of user's orders
 */

// GET /api/orders/my
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
};

/**
 * Get single order by ID
 * Allows owner or guest to retrieve order details
 *
 * @async
 * @param {Object} req - Express request with order ID in params
 * @param {Object} res - Express response
 * @returns {Object} Order details if accessible
 */

// GET /api/orders/:id
export const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  const isOwner = order.userId?.toString() === req.user?._id?.toString();
  const isGuest = !order.userId;
  if (!isOwner && !isGuest)
    return res.status(403).json({ message: 'Not authorized' });

  res.json(order);
};
