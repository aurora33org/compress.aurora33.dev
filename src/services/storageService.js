const fs = require('fs').promises;
const path = require('path');
const config = require('../config/config');
const logger = require('../utils/logger');

class StorageService {
  constructor() {
    this.baseDir = config.tmpDir;
  }

  async initialize() {
    try {
      await fs.mkdir(this.baseDir, { recursive: true });
      logger.info(`Storage initialized at ${this.baseDir}`);
    } catch (error) {
      logger.error('Failed to initialize storage:', error);
      throw error;
    }
  }

  getJobDir(jobId) {
    return path.join(this.baseDir, jobId);
  }

  getUploadDir(jobId) {
    return path.join(this.getJobDir(jobId), 'uploads');
  }

  getProcessedDir(jobId) {
    return path.join(this.getJobDir(jobId), 'processed');
  }

  async createJobDirectories(jobId) {
    try {
      const uploadDir = this.getUploadDir(jobId);
      const processedDir = this.getProcessedDir(jobId);

      await fs.mkdir(uploadDir, { recursive: true });
      await fs.mkdir(processedDir, { recursive: true });

      logger.debug(`Created directories for job ${jobId}`);
      return { uploadDir, processedDir };
    } catch (error) {
      logger.error(`Failed to create directories for job ${jobId}:`, error);
      throw error;
    }
  }

  async saveMetadata(jobId, metadata) {
    try {
      const metadataPath = path.join(this.getJobDir(jobId), 'metadata.json');
      await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
      logger.debug(`Saved metadata for job ${jobId}`);
    } catch (error) {
      logger.error(`Failed to save metadata for job ${jobId}:`, error);
      throw error;
    }
  }

  async getMetadata(jobId) {
    try {
      const metadataPath = path.join(this.getJobDir(jobId), 'metadata.json');
      const data = await fs.readFile(metadataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      logger.error(`Failed to read metadata for job ${jobId}:`, error);
      return null;
    }
  }

  async listFiles(directory) {
    try {
      const files = await fs.readdir(directory);
      return files.filter(file => !file.startsWith('.'));
    } catch (error) {
      logger.error(`Failed to list files in ${directory}:`, error);
      return [];
    }
  }

  async getFileStats(filePath) {
    try {
      const stats = await fs.stat(filePath);
      return {
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime
      };
    } catch (error) {
      logger.error(`Failed to get stats for ${filePath}:`, error);
      return null;
    }
  }

  async deleteJob(jobId) {
    try {
      const jobDir = this.getJobDir(jobId);
      await fs.rm(jobDir, { recursive: true, force: true });
      logger.info(`Deleted job directory: ${jobId}`);
      return true;
    } catch (error) {
      logger.error(`Failed to delete job ${jobId}:`, error);
      return false;
    }
  }

  async cleanupOldJobs(maxAge) {
    try {
      const jobs = await fs.readdir(this.baseDir);
      const now = Date.now();
      let cleaned = 0;

      for (const jobId of jobs) {
        const jobDir = this.getJobDir(jobId);
        const metadataPath = path.join(jobDir, 'metadata.json');

        try {
          const stats = await fs.stat(metadataPath);
          const age = (now - stats.mtime.getTime()) / 1000; // seconds

          if (age > maxAge) {
            await this.deleteJob(jobId);
            cleaned++;
          }
        } catch (error) {
          // If metadata doesn't exist, delete the job anyway
          await this.deleteJob(jobId);
          cleaned++;
        }
      }

      if (cleaned > 0) {
        logger.info(`Cleanup completed: removed ${cleaned} old job(s)`);
      }

      return cleaned;
    } catch (error) {
      logger.error('Failed to cleanup old jobs:', error);
      return 0;
    }
  }
}

module.exports = new StorageService();
