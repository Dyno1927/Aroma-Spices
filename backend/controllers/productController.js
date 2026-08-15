/**
 * Product Controller
 * Handles product retrieval and listing operations
 */

import Product from '../models/productsModel.js';

/**
 * Get all products
 * Retrieves all products from database, sorted by ID
 *
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} {success, count, data} - Array of all products
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ id: 1 });
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message,
    });
  }
};
