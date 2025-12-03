const cron = require('node-cron');
const config = require('../config/config');
const storageService = require('./storageService');
const jobManager = require('./jobManager');
const logger = require('../utils/logger');

class CleanupService {
  constructor() {
    this.task = null;
    this.isRunning = false;
  }

  start() {
    if (this.task) {
      logger.warn('Cleanup service is already running');
      return;
    }

    // Run every N minutes based on config
    const cronExpression = `*/${config.cleanupInterval} * * * *`;

    this.task = cron.schedule(cronExpression, async () => {
      await this.cleanup();
    });

    logger.info(`Cleanup service started (runs every ${config.cleanupInterval} minutes)`);

    // Run initial cleanup after 1 minute
    setTimeout(() => this.cleanup(), 60000);
  }

  async cleanup() {
    if (this.isRunning) {
      logger.debug('Cleanup already in progress, skipping...');
      return;
    }

    this.isRunning = true;
    logger.info('Starting cleanup...');

    try {
      // Clean up old job files
      const cleaned = await storageService.cleanupOldJobs(config.fileTTL);

      // Clean up old jobs from memory
      const jobs = jobManager.getAllJobs();
      const now = Date.now();
      let memoryCleanedCount = 0;

      for (const job of jobs) {
        const age = (now - job.updatedAt) / 1000; // seconds
        if (age > config.fileTTL) {
          jobManager.deleteJob(job.id);
          memoryCleanedCount++;
        }
      }

      if (memoryCleanedCount > 0) {
        logger.info(`Removed ${memoryCleanedCount} old job(s) from memory`);
      }

      if (cleaned > 0 || memoryCleanedCount > 0) {
        logger.success(`Cleanup completed: ${cleaned} file jobs, ${memoryCleanedCount} memory jobs`);
      } else {
        logger.debug('Cleanup completed: nothing to clean');
      }
    } catch (error) {
      logger.error('Cleanup failed:', error);
    } finally {
      this.isRunning = false;
    }
  }

  stop() {
    if (this.task) {
      this.task.stop();
      this.task = null;
      logger.info('Cleanup service stopped');
    }
  }

  async runNow() {
    return this.cleanup();
  }
}

module.exports = new CleanupService();
