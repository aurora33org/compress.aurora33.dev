const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const jobManager = require('../services/jobManager');
const storageService = require('../services/storageService');
const imageProcessor = require('../services/imageProcessor');
const zipService = require('../services/zipService');
const upload = require('../middleware/uploadMiddleware');
const validateSettings = require('../middleware/validateSettings');
const logger = require('../utils/logger');
const { NotFoundError, BadRequestError, ProcessingError } = require('../utils/errors');

/**
 * POST /api/jobs
 * Create a new compression job
 */
router.post('/', async (req, res, next) => {
  try {
    const job = jobManager.createJob();
    await storageService.createJobDirectories(job.id);

    logger.success(`Created job: ${job.id}`);

    res.status(201).json({
      success: true,
      jobId: job.id,
      message: 'Job created successfully'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/jobs/:jobId/upload
 * Upload image files for a compression job
 */
router.post('/:jobId/upload', async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = jobManager.getJob(jobId);

    if (!job) {
      throw new NotFoundError('Job');
    }

    if (job.status !== 'created') {
      throw new BadRequestError(`Cannot upload to job in status: ${job.status}`);
    }

    // Set upload directory for multer
    req.uploadDir = storageService.getUploadDir(jobId);

    // Update job status
    jobManager.setJobStatus(jobId, 'uploading');

    // Handle upload
    upload.array('images')(req, res, async (err) => {
      if (err) {
        jobManager.setJobStatus(jobId, 'failed', err.message);
        return next(err);
      }

      try {
        if (!req.files || req.files.length === 0) {
          throw new BadRequestError('No files were uploaded');
        }

        // Calculate total size and add files to job
        let totalSize = 0;
        for (const file of req.files) {
          jobManager.addUploadedFile(jobId, file.filename, file.size);
          totalSize += file.size;
        }

        // Update job status
        jobManager.setJobStatus(jobId, 'uploaded');

        // Save metadata
        await storageService.saveMetadata(jobId, {
          uploadedAt: Date.now(),
          fileCount: req.files.length,
          totalSize
        });

        logger.success(`Uploaded ${req.files.length} files for job ${jobId}`);

        res.json({
          success: true,
          filesUploaded: req.files.length,
          totalSize,
          files: req.files.map(f => ({
            filename: f.filename,
            size: f.size,
            mimetype: f.mimetype
          }))
        });
      } catch (uploadError) {
        jobManager.setJobStatus(jobId, 'failed', uploadError.message);
        next(uploadError);
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/jobs/:jobId/process
 * Start compression processing for uploaded images
 */
router.post('/:jobId/process', validateSettings, async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { format, quality, resize } = req.body;

    const job = jobManager.getJob(jobId);

    if (!job) {
      throw new NotFoundError('Job');
    }

    if (job.status !== 'uploaded') {
      throw new BadRequestError(`Cannot process job in status: ${job.status}`);
    }

    // Set job settings and status
    jobManager.setJobSettings(jobId, { format, quality, resize });
    jobManager.setJobStatus(jobId, 'processing');

    logger.info(`Starting processing for job: ${jobId}`);

    // Get input and output directories
    const uploadDir = storageService.getUploadDir(jobId);
    const processedDir = storageService.getProcessedDir(jobId);

    // Get list of uploaded files
    const files = await storageService.listFiles(uploadDir);
    const inputPaths = files.map(f => path.join(uploadDir, f));

    // Process images asynchronously (non-blocking)
    setImmediate(async () => {
      try {
        const result = await imageProcessor.processImages(
          inputPaths,
          processedDir,
          { format, quality, resize },
          (processed, total) => {
            jobManager.updateProgress(jobId, processed, total);
          }
        );

        // Update job with results
        let successCount = 0;
        for (const fileResult of result.results) {
          if (fileResult.success) {
            jobManager.addProcessedFile(
              jobId,
              fileResult.outputFilename,
              fileResult.originalSize,
              fileResult.compressedSize
            );
            successCount++;
          }
        }

        // Create ZIP file
        const zipPath = path.join(storageService.getJobDir(jobId), 'processed.zip');
        await zipService.createZip(processedDir, zipPath);

        jobManager.setJobStatus(jobId, 'completed');
        logger.success(
          `Job ${jobId} completed: ${successCount}/${result.results.length} files processed`
        );
      } catch (error) {
        logger.error(`Job ${jobId} processing failed:`, error.message);
        jobManager.setJobStatus(jobId, 'failed', error.message);
      }
    });

    res.json({
      success: true,
      message: 'Processing started',
      jobId
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/jobs/:jobId/status
 * Get the current status and progress of a job
 */
router.get('/:jobId/status', (req, res, next) => {
  try {
    const { jobId } = req.params;
    const stats = jobManager.getJobStats(jobId);

    if (!stats) {
      throw new NotFoundError('Job');
    }

    res.json({
      success: true,
      ...stats
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/jobs/:jobId/download
 * Download the processed images as a ZIP file
 */
router.get('/:jobId/download', async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = jobManager.getJob(jobId);

    if (!job) {
      throw new NotFoundError('Job');
    }

    if (job.status !== 'completed') {
      throw new BadRequestError(
        `Cannot download job in status: ${job.status}. Job must be completed.`
      );
    }

    const zipPath = path.join(storageService.getJobDir(jobId), 'processed.zip');

    try {
      await fs.access(zipPath);
    } catch {
      throw new NotFoundError('Processed files');
    }

    logger.info(`Downloading job ${jobId}`);

    res.download(zipPath, `compressed-images-${jobId}.zip`, (err) => {
      if (err) {
        logger.error(`Download failed for job ${jobId}:`, err.message);
        if (!res.headersSent) {
          next(err);
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/jobs/:jobId
 * Delete a job and its associated files
 */
router.delete('/:jobId', async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = jobManager.getJob(jobId);

    if (!job) {
      throw new NotFoundError('Job');
    }

    // Delete files from storage
    await storageService.deleteJob(jobId);

    // Delete from memory
    jobManager.deleteJob(jobId);

    logger.success(`Deleted job: ${jobId}`);

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
