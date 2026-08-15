import {
  createOrder,
  getMyOrders,
  getOrder,
  verifyPayment,
} from '../controllers/orderController.js';
import { optionalAuth, protect } from '../middleware/authMiddleware.js';
import { verifyTurnstile } from '../middleware/turnstileMiddleware.js';
/**
 * Order Routes
 * API endpoints for order creation, payment verification, and order retrieval
 */

import express from 'express';

const router = express.Router();

router.post('/create', optionalAuth, verifyTurnstile, createOrder);
router.post('/verify', optionalAuth, verifyPayment);
router.get('/my', protect, getMyOrders);
router.get('/:id', optionalAuth, getOrder);

export default router;
