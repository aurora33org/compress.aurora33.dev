const config = require('../config/config');

const validateSettings = (req, res, next) => {
  const { format, quality, resize } = req.body;

  // Validate format
  if (!format || !config.outputFormats.includes(format)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid format',
      message: `Format must be one of: ${config.outputFormats.join(', ')}`
    });
  }

  // Validate quality
  if (quality !== undefined) {
    const qualityNum = parseInt(quality);
    if (isNaN(qualityNum) || qualityNum < 1 || qualityNum > 100) {
      return res.status(400).json({
        success: false,
        error: 'Invalid quality',
        message: 'Quality must be a number between 1 and 100'
      });
    }
    req.body.quality = qualityNum;
  }

  // Validate resize if provided
  if (resize) {
    if (typeof resize !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Invalid resize',
        message: 'Resize must be an object with width and/or height'
      });
    }

    if (resize.width !== undefined && resize.width !== null) {
      const width = parseInt(resize.width);
      if (isNaN(width) || width < 1 || width > 10000) {
        return res.status(400).json({
          success: false,
          error: 'Invalid width',
          message: 'Width must be a number between 1 and 10000'
        });
      }
      resize.width = width;
    }

    if (resize.height !== undefined && resize.height !== null) {
      const height = parseInt(resize.height);
      if (isNaN(height) || height < 1 || height > 10000) {
        return res.status(400).json({
          success: false,
          error: 'Invalid height',
          message: 'Height must be a number between 1 and 10000'
        });
      }
      resize.height = height;
    }

    if (resize.fit && !['cover', 'contain', 'fill', 'inside', 'outside'].includes(resize.fit)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid fit',
        message: 'Fit must be one of: cover, contain, fill, inside, outside'
      });
    }
  }

  next();
};

module.exports = validateSettings;
