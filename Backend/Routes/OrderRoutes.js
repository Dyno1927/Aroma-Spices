import {
  createOrder,
  getMyOrders,
  getOrder,
  verifyPayment,
} from '../Controllers/OrderController.js';
import { optionalAuth, protect } from '../Middleware/AuthMiddleware.js';
import { verifyTurnstile } from '../Middleware/TurnstileMiddleware.js';
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
