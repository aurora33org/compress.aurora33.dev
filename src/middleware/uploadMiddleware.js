const multer = require('multer');
const path = require('path');
const config = require('../config/config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // The destination will be set by the route handler
    cb(null, req.uploadDir);
  },
  filename: (req, file, cb) => {
    // Preserve original filename with sanitization
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, sanitized);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type: ${file.mimetype}. Only JPG, PNG, WebP, and GIF are allowed.`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.maxFileSize,
    files: config.maxFiles
  }
});

module.exports = upload;
