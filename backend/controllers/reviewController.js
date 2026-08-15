/**
 * Review Controller
 * Manages product reviews and ratings
 */

import Review from '../models/reviewModel.js';

/**
 * Get all reviews for a product
 * Retrieves reviews sorted by newest first
 *
 * @async
 * @param {Object} req - Express request with productId in params
 * @param {Object} res - Express response
 * @returns {Object[]} Array of reviews for the product
 */
// Get reviews for a product
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: parseInt(req.params.productId),
    }).sort({ createdAt: -1 }); // Newest first

    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Submit a new review
 * Creates review with name, rating (1-5), and comment
 * Validates all required fields before saving
 *
 * @async
 * @param {Object} req - Express request with productId in params, body has name/rating/comment
 * @param {Object} res - Express response
 * @returns {Object} Created review object
 */
// Submit a review
export const addReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'All fields required',
      });
    }

    const review = await Review.create({
      productId: parseInt(req.params.productId),
      name,
      rating,
      comment,
    });

    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
