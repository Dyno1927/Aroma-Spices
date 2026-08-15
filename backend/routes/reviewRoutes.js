/**
 * Review Routes
 * API endpoints for retrieving and submitting product reviews
 */

import { addReview, getReviews } from '../controllers/reviewController.js';
import express from 'express';

const router = express.Router();

router.get('/:productId', getReviews);
router.post('/:productId', addReview);

export default router;
