const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');
const storageService = require('./services/storageService');
const cleanupService = require('./services/cleanupService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api', routes);

// Error handler (must be last)
app.use(errorHandler);

// Initialize and start server
async function start() {
  try {
    // Initialize storage
    await storageService.initialize();

    // Start cleanup service
    cleanupService.start();

    // Start server
    app.listen(config.port, () => {
      logger.success(`Server running on port ${config.port}`);
      logger.info(`Environment: ${config.nodeEnv}`);
      logger.info(`Max file size: ${(config.maxFileSize / 1024 / 1024).toFixed(2)} MB`);
      logger.info(`Max files per job: ${config.maxFiles}`);
      logger.info(`File TTL: ${config.fileTTL} seconds`);
      logger.info(`Open http://localhost:${config.port} to use the app`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  cleanupService.stop();
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully...');
  cleanupService.stop();
  process.exit(0);
});

// Start the server
start();
