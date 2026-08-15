import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

/**
 * Protected route middleware - requires valid JWT token
 * Extracts token from Authorization header and attaches user to request
 *
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Calls next middleware if authenticated
 * @returns {void}
 */
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // full user
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError')
      return res.status(401).json({ message: 'Token expired' });
    return res.status(401).json({ message: 'Invalid token' });
  }
};

/**
 * Admin check middleware (placeholder for future implementation)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
export const adminMiddleware = (req, res, next) => {
  // Check if user is admin (implement later)
  next();
};

/**
 * Optional authentication middleware
 * Attempts to authenticate but doesn't fail if token is invalid/missing
 * Allows guest access while preserving authenticated user data
 *
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Calls next middleware regardless of auth status
 * @returns {void}
 */
export const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return next();
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
  } catch (error) {
    console.error(error);
  }
  next();
};
