/**
 * Product Schema
 * Defines structure for product documents in MongoDB
 */

import mongoose from 'mongoose';

/**
 * Product document structure
 * @typedef {Object} Product
 * @property {number} id - Auto-generated product ID
 * @property {string} name - Product name
 * @property {string} slug - SEO friendly URL slug
 * @property {number} price - Price in rupees
 * @property {string} weight - Product package weight
 * @property {string} description - Product description
 * @property {string} image - Product image filename
 * @property {number} stock - Available quantity
 * @property {string} category - Product category
 * @property {number} rating - Product rating
 * @property {number} reviews - Total review count
 * @property {boolean} featured - Featured product flag
 * @property {boolean} isActive - Product visibility status
 * @property {Date} createdAt - Auto-generated timestamp
 * @property {Date} updatedAt - Auto-generated timestamp
 */
const productSchema = new mongoose.Schema(
  {
    /**
     * Auto-generated numeric product ID
     */
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    /**
     * Product name
     */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * SEO friendly URL slug
     * Example: turmeric-powder
     */
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    /**
     * Product price in INR
     */
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    /**
     * Product package size
     * Example: 100g, 250g, 500g
     */
    weight: {
      type: String,
      required: true,
    },

    /**
     * Product description
     */
    description: {
      type: String,
      required: true,
    },

    /**
     * Product image gallery
     * Maximum 5 images
     */
    images: {
      type: [String],
      required: true,
      default: [],
    },

    /**
     * Current inventory count
     */
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    /**
     * Product category
     */
    category: {
      type: String,
      required: true,
    },

    /**
     * Average customer rating
     */
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    /**
     * Total review count
     */
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    /**
     * Homepage featured product flag
     */
    featured: {
      type: Boolean,
      default: false,
    },

    /**
     * Product visibility flag
     */
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', productSchema);
