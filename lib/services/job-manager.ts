import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

interface JobFile {
  filename: string;
  size: number;
}

interface ProcessedFile {
  filename: string;
  originalSize: number;
  compressedSize: number;
  reduction: number;
}

interface Job {
  id: string;
  status: 'created' | 'uploading' | 'uploaded' | 'processing' | 'completed' | 'failed';
  uploadedFiles: JobFile[];
  processedFiles: ProcessedFile[];
  settings: any;
  progress: number;
  totalFiles: number;
  processedCount: number;
  originalSize: number;
  compressedSize: number;
  error: string | null;
  createdAt: number;
  updatedAt: number;
}

class JobManager {
  private jobs: Map<string, Job> = new Map();

  createJob(): Job {
    const jobId = uuidv4();
    const job: Job = {
      id: jobId,
      status: 'created',
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

  getJob(jobId: string): Job | undefined {
    return this.jobs.get(jobId);
  }

  updateJob(jobId: string, updates: Partial<Job>): Job | null {
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

  updateProgress(jobId: string, processedCount: number, totalFiles: number): Job | null {
    const progress = Math.round((processedCount / totalFiles) * 100);
    return this.updateJob(jobId, {
      processedCount,
      progress,
      status: progress === 100 ? 'completed' : 'processing'
    });
  }

  addUploadedFile(jobId: string, filename: string, size: number): Job | null {
    const job = this.jobs.get(jobId);
    if (!job) return null;

    job.uploadedFiles.push({ filename, size });
    job.totalFiles = job.uploadedFiles.length;
    job.originalSize += size;
    job.updatedAt = Date.now();

    this.jobs.set(jobId, job);
    return job;
  }

  addProcessedFile(jobId: string, filename: string, originalSize: number, compressedSize: number): Job | null {
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

  setJobSettings(jobId: string, settings: any): Job | null {
    return this.updateJob(jobId, { settings });
  }

  setJobStatus(jobId: string, status: Job['status'], error: string | null = null): Job | null {
    return this.updateJob(jobId, { status, error });
  }

  deleteJob(jobId: string): boolean {
    const deleted = this.jobs.delete(jobId);
    if (deleted) {
      logger.info(`Deleted job from memory: ${jobId}`);
    }
    return deleted;
  }

  getAllJobs(): Job[] {
    return Array.from(this.jobs.values());
  }

  getJobStats(jobId: string) {
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

// Global singleton to persist across hot reloads in development
declare global {
  var jobManagerInstance: JobManager | undefined;
}

export const jobManager = global.jobManagerInstance || new JobManager();

// Store reference globally to prevent recreation on hot reload
if (process.env.NODE_ENV === 'development') {
  global.jobManagerInstance = jobManager;
}
