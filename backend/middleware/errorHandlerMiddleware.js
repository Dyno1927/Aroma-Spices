/**
 * Global Error Handler Middleware
 * Catches and formats all errors in a consistent response structure
 *
 * @param {Error} error - The error object thrown by routes/controllers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} Sends JSON error response
 */
export const errorHandler = (error, req, res, next) => {
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};
