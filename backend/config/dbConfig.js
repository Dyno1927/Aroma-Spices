/**
 * Database Configuration Module
 * Handles MongoDB connection and disconnection
 */

import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * @async
 * @function connectDB
 * @returns {Promise<void>}
 * @throws {Error} Exits process if connection fails
 */
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'aroma-spices' });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Handle disconnection gracefully
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB Disconnected');
});
