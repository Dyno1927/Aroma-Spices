/**
 * Review Schema
 * Stores product reviews with ratings and comments
 */

import mongoose from 'mongoose';

/**
 * Review document structure
 * @typedef {Object} Review
 * @property {number} productId - ID of reviewed product
 * @property {string} name - Reviewer name
 * @property {number} rating - Rating 1-5 stars
 * @property {string} comment - Review comment
 * @property {string} date - Date in locale format (India)
 * @property {Date} createdAt - Auto-generated timestamp
 * @property {Date} updatedAt - Auto-generated timestamp
 */
const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('en-IN'),
    },
  },
  { timestamps: true }
);

reviewSchema.post('save', async function () {
  const stats = await mongoose.model('Review').aggregate([
    { $match: { productId: this.productId } },
    {
      $group: {
        _id: '$productId',
        avgRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await mongoose.model('Product').updateOne(
      { id: this.productId },
      {
        avgRating: Math.round(stats[0].avgRating * 10) / 10,
        reviewCount: stats[0].reviewCount,
      }
    );
  }
});

export default mongoose.model('Review', reviewSchema);
