/**
 * Product Routes
 * API endpoints for product browsing and retrieval
 */

import { getAllProducts } from '../controllers/productController.js';
import express from 'express';

const router = express.Router();

// GET all products
router.get('/', getAllProducts);

export default router;
