const config = require('../config/config');
const { ValidationError } = require('../utils/errors');

/**
 * Middleware to validate compression settings
 * Validates format, quality, and resize parameters
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateSettings = (req, res, next) => {
  try {
    const { format, quality, resize } = req.body;

    // Validate format (required)
    if (!format || !config.outputFormats.includes(format)) {
      throw new ValidationError(
        'Invalid format',
        { allowedFormats: config.outputFormats }
      );
    }

    // Validate quality (optional, 1-100)
    if (quality !== undefined) {
      const qualityNum = parseInt(quality, 10);
      if (isNaN(qualityNum) || qualityNum < 1 || qualityNum > 100) {
        throw new ValidationError('Quality must be a number between 1 and 100');
      }
      req.body.quality = qualityNum;
    }

    // Validate resize if provided
    if (resize) {
      if (typeof resize !== 'object' || Array.isArray(resize)) {
        throw new ValidationError('Resize must be an object with width and/or height');
      }

      // Validate width
      if (resize.width !== undefined && resize.width !== null) {
        const width = parseInt(resize.width, 10);
        if (isNaN(width) || width < 1 || width > 10000) {
          throw new ValidationError('Width must be a number between 1 and 10000');
        }
        resize.width = width;
      }

      // Validate height
      if (resize.height !== undefined && resize.height !== null) {
        const height = parseInt(resize.height, 10);
        if (isNaN(height) || height < 1 || height > 10000) {
          throw new ValidationError('Height must be a number between 1 and 10000');
        }
        resize.height = height;
      }

      // Validate fit (optional)
      if (resize.fit) {
        const validFits = ['cover', 'contain', 'fill', 'inside', 'outside'];
        if (!validFits.includes(resize.fit)) {
          throw new ValidationError(
            'Fit must be one of: cover, contain, fill, inside, outside'
          );
        }
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateSettings;
