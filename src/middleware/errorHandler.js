const logger = require('../utils/logger');
const { AppError } = require('../utils/errors');

/**
 * Global error handling middleware
 * Catches all errors and formats them consistently
 *
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error(`[${err.name}] ${err.message}`, {
    url: req.originalUrl,
    method: req.method,
    stack: err.stack
  });

  // Handle Multer specific errors
  const multerErrorMap = {
    'LIMIT_FILE_SIZE': {
      statusCode: 400,
      message: 'File size exceeds the maximum limit'
    },
    'LIMIT_FILE_COUNT': {
      statusCode: 400,
      message: 'Too many files uploaded at once'
    },
    'LIMIT_UNEXPECTED_FILE': {
      statusCode: 400,
      message: 'Unexpected file field in request'
    }
  };

  if (err.code && multerErrorMap[err.code]) {
    const { statusCode, message } = multerErrorMap[err.code];
    return res.status(statusCode).json({
      success: false,
      error: message
    });
  }

  // Handle custom AppError instances
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.details && { details: err.details }),
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // Handle unknown errors
  const statusCode = err.statusCode || 500;
  const isDevelopment = process.env.NODE_ENV === 'development';

  res.status(statusCode).json({
    success: false,
    error: statusCode === 500 ? 'Internal server error' : err.message,
    ...(isDevelopment && {
      stack: err.stack,
      originalError: err.message
    })
  });
};

module.exports = errorHandler;
