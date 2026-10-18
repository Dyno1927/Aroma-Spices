/**
 * Product Routes
 * API endpoints for product browsing and retrieval
 */

import { getAllProducts } from '../Controllers/ProductController.js';
import express from 'express';

const router = express.Router();

// GET all products
router.get('/', getAllProducts);

export default router;
