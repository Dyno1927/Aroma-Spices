import {
  getCurrentUser,
  login,
  logout,
  refreshToken,
  resendVerification,
  signup,
  updateProfile,
  verifyEmail,
} from '../Controllers/AuthController.js';
import { protect } from '../Middleware/AuthMiddleware.js';
import { verifyTurnstile } from '../Middleware/TurnstileMiddleware.js';
/**
 * Authentication Routes
 * Handles user registration, login, email verification, and token refresh
 */

import express from 'express';

const router = express.Router();

// Public routes
router.post('/signup', verifyTurnstile, signup);
router.post('/login', verifyTurnstile, login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

// Protected routes
router.post('/resend-verification', protect, resendVerification);
router.get('/me', protect, getCurrentUser);
router.get('/verify-email/:token', verifyEmail);
router.put('/profile', protect, updateProfile);

export default router;
