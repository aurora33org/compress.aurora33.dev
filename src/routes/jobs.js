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

// Create a new job
router.post('/', async (req, res, next) => {
  try {
    const job = jobManager.createJob();
    await storageService.createJobDirectories(job.id);

    res.json({
      success: true,
      jobId: job.id,
      message: 'Job created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Upload files to a job
router.post('/:jobId/upload', async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = jobManager.getJob(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
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

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'No files uploaded'
        });
      }

      // Add files to job
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
    });
  } catch (error) {
    next(error);
  }
});

// Process uploaded images
router.post('/:jobId/process', validateSettings, async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { format, quality, resize } = req.body;

    const job = jobManager.getJob(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }

    if (job.status !== 'uploaded') {
      return res.status(400).json({
        success: false,
        error: `Cannot process job in status: ${job.status}`
      });
    }

    // Set job settings and status
    jobManager.setJobSettings(jobId, { format, quality, resize });
    jobManager.setJobStatus(jobId, 'processing');

    // Get input and output directories
    const uploadDir = storageService.getUploadDir(jobId);
    const processedDir = storageService.getProcessedDir(jobId);

    // Get list of uploaded files
    const files = await storageService.listFiles(uploadDir);
    const inputPaths = files.map(f => path.join(uploadDir, f));

    // Process images asynchronously
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
        for (const fileResult of result.results) {
          if (fileResult.success) {
            jobManager.addProcessedFile(
              jobId,
              fileResult.outputFilename,
              fileResult.originalSize,
              fileResult.compressedSize
            );
          }
        }

        // Create ZIP file
        const zipPath = path.join(storageService.getJobDir(jobId), 'processed.zip');
        await zipService.createZip(processedDir, zipPath);

        jobManager.setJobStatus(jobId, 'completed');
        logger.success(`Job ${jobId} completed successfully`);
      } catch (error) {
        logger.error(`Job ${jobId} failed:`, error);
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

// Get job status
router.get('/:jobId/status', (req, res, next) => {
  try {
    const { jobId } = req.params;
    const stats = jobManager.getJobStats(jobId);

    if (!stats) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }

    res.json({
      success: true,
      ...stats
    });
  } catch (error) {
    next(error);
  }
});

// Download processed images
router.get('/:jobId/download', async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = jobManager.getJob(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }

    if (job.status !== 'completed') {
      return res.status(400).json({
        success: false,
        error: `Cannot download job in status: ${job.status}`,
        currentStatus: job.status
      });
    }

    const zipPath = path.join(storageService.getJobDir(jobId), 'processed.zip');

    try {
      await fs.access(zipPath);
    } catch {
      return res.status(404).json({
        success: false,
        error: 'Processed files not found'
      });
    }

    res.download(zipPath, `compressed-images-${jobId}.zip`, (err) => {
      if (err) {
        logger.error(`Download failed for job ${jobId}:`, err);
        if (!res.headersSent) {
          next(err);
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Delete a job
router.delete('/:jobId', async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = jobManager.getJob(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }

    // Delete files
    await storageService.deleteJob(jobId);

    // Delete from memory
    jobManager.deleteJob(jobId);

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
