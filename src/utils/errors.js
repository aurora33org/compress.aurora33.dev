/**
 * Custom Error Classes for Image Compressor Application
 * Provides structured error handling with proper HTTP status codes
 */

/**
 * Base Application Error class
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation Error - for invalid input
 * HTTP 400
 */
class ValidationError extends AppError {
  constructor(message, details = {}) {
    super(message, 400);
    this.details = details;
  }
}

/**
 * Not Found Error - for missing resources
 * HTTP 404
 */
class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

/**
 * Conflict Error - for conflicting state
 * HTTP 409
 */
class ConflictError extends AppError {
  constructor(message) {
    super(message, 409);
  }
}

/**
 * Bad Request Error - for malformed requests
 * HTTP 400
 */
class BadRequestError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

/**
 * Internal Server Error - for unexpected errors
 * HTTP 500
 */
class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(message, 500);
  }
}

/**
 * File Processing Error - for image processing failures
 * HTTP 500
 */
class ProcessingError extends AppError {
  constructor(message, originalError = null) {
    super(`Image processing failed: ${message}`, 500);
    this.originalError = originalError;
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
  ConflictError,
  BadRequestError,
  InternalServerError,
  ProcessingError
};
