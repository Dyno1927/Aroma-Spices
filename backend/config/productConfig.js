import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/productsModel.js';

/* Uncomment the lines below when seeding */
// import dotenv from 'dotenv';
// dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Generate SEO-friendly slug
 *
 * Example:
 * Turmeric Powder -> turmeric-powder
 *
 * @param {string} name Product name
 * @returns {string} Generated slug
 */
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

/**
 * Generate product image gallery
 *
 * Example:
 * Turmeric Powder ->
 * [
 *   "TurmericPowder1.png",
 *   "TurmericPowder2.png",
 *   "TurmericPowder3.png",
 *   "TurmericPowder4.png",
 *   "TurmericPowder5.png"
 * ]
 *
 * @param {string} name Product name
 * @returns {string[]} Product image filenames
 */
const generateImages = (name) => {
  const baseName = name.replace(/[^a-zA-Z0-9]/g, '');

  return [
    `${baseName}1.png`,
    `${baseName}2.png`,
    `${baseName}3.png`,
    `${baseName}4.png`,
    `${baseName}5.png`,
  ];
};

/**
 * Seed products into MongoDB
 */
const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'aroma-spices',
    });

    console.log('✅ MongoDB Connected');

    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8')
    );

    /**
     * Transform products before inserting
     *
     * Auto-generates:
     * - id
     * - slug
     * - image
     * - rating
     * - reviews
     * - isActive
     */
    const transformedProducts = products.map((product, index) => ({
      /**
       * Auto-generated product ID
       */
      id: index + 1,

      /**
       * User-defined product data
       */
      ...product,

      /**
       * SEO slug
       */
      slug: generateSlug(product.name),

      /**
       * Auto-generated image filename
       */
      images: generateImages(product.name),

      /**
       * Default review statistics
       */
      rating: 0,

      reviews: 0,

      /**
       * Product visibility
       */
      isActive: true,
    }));

    /**
     * Clear existing products
     */
    await Product.deleteMany({});

    /**
     * Insert transformed products
     */
    await Product.insertMany(transformedProducts);

    const count = await Product.countDocuments();

    console.log(`Products in MongoDB: ${count}`);
    console.log(
      `✅ Seeded ${transformedProducts.length} products successfully`
    );

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seed();
