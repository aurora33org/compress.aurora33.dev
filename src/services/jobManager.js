const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

class JobManager {
  constructor() {
    this.jobs = new Map();
  }

  createJob() {
    const jobId = uuidv4();
    const job = {
      id: jobId,
      status: 'created', // created, uploading, uploaded, processing, completed, failed
      uploadedFiles: [],
      processedFiles: [],
      settings: null,
      progress: 0,
      totalFiles: 0,
      processedCount: 0,
      originalSize: 0,
      compressedSize: 0,
      error: null,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.jobs.set(jobId, job);
    logger.info(`Created new job: ${jobId}`);
    return job;
  }

  getJob(jobId) {
    return this.jobs.get(jobId);
  }

  updateJob(jobId, updates) {
    const job = this.jobs.get(jobId);
    if (!job) {
      logger.warn(`Attempted to update non-existent job: ${jobId}`);
      return null;
    }

    Object.assign(job, updates, { updatedAt: Date.now() });
    this.jobs.set(jobId, job);
    logger.debug(`Updated job ${jobId}:`, updates);
    return job;
  }

  updateProgress(jobId, processedCount, totalFiles) {
    const progress = Math.round((processedCount / totalFiles) * 100);
    return this.updateJob(jobId, {
      processedCount,
      progress,
      status: progress === 100 ? 'completed' : 'processing'
    });
  }

  addUploadedFile(jobId, filename, size) {
    const job = this.jobs.get(jobId);
    if (!job) return null;

    job.uploadedFiles.push({ filename, size });
    job.totalFiles = job.uploadedFiles.length;
    job.originalSize += size;
    job.updatedAt = Date.now();

    this.jobs.set(jobId, job);
    return job;
  }

  addProcessedFile(jobId, filename, originalSize, compressedSize) {
    const job = this.jobs.get(jobId);
    if (!job) return null;

    job.processedFiles.push({
      filename,
      originalSize,
      compressedSize,
      reduction: Math.round(((originalSize - compressedSize) / originalSize) * 100)
    });
    job.compressedSize += compressedSize;
    job.updatedAt = Date.now();

    this.jobs.set(jobId, job);
    return job;
  }

  setJobSettings(jobId, settings) {
    return this.updateJob(jobId, { settings });
  }

  setJobStatus(jobId, status, error = null) {
    return this.updateJob(jobId, { status, error });
  }

  deleteJob(jobId) {
    const deleted = this.jobs.delete(jobId);
    if (deleted) {
      logger.info(`Deleted job from memory: ${jobId}`);
    }
    return deleted;
  }

  getAllJobs() {
    return Array.from(this.jobs.values());
  }

  getJobStats(jobId) {
    const job = this.jobs.get(jobId);
    if (!job) return null;

    return {
      id: job.id,
      status: job.status,
      progress: job.progress,
      totalFiles: job.totalFiles,
      processedCount: job.processedCount,
      originalSize: job.originalSize,
      compressedSize: job.compressedSize,
      reduction: job.originalSize > 0
        ? Math.round(((job.originalSize - job.compressedSize) / job.originalSize) * 100)
        : 0,
      createdAt: job.createdAt,
      error: job.error
    };
  }
}

module.exports = new JobManager();
