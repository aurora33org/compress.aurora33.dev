const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const logger = require('../utils/logger');

class ImageProcessor {
  constructor() {
    this.formatConfigs = {
      webp: {
        quality: 80,
        effort: 4
      },
      jpeg: {
        quality: 80,
        mozjpeg: true
      },
      png: {
        compressionLevel: 9,
        quality: 80
      }
    };
  }

  async processImage(inputPath, outputPath, settings) {
    try {
      const { format, quality, resize } = settings;

      // Get format config
      const formatConfig = { ...this.formatConfigs[format] };
      if (quality !== undefined) {
        formatConfig.quality = quality;
      }

      // Create sharp instance
      let pipeline = sharp(inputPath);

      // Apply resize if specified
      if (resize && (resize.width || resize.height)) {
        pipeline = pipeline.resize({
          width: resize.width || null,
          height: resize.height || null,
          fit: resize.fit || 'inside',
          withoutEnlargement: true
        });
      }

      // Convert to target format and save
      await pipeline
        .toFormat(format, formatConfig)
        .toFile(outputPath);

      // Get file sizes
      const inputStats = await fs.stat(inputPath);
      const outputStats = await fs.stat(outputPath);

      logger.debug(`Processed: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);

      return {
        success: true,
        originalSize: inputStats.size,
        compressedSize: outputStats.size,
        reduction: Math.round(((inputStats.size - outputStats.size) / inputStats.size) * 100)
      };
    } catch (error) {
      logger.error(`Failed to process image ${inputPath}:`, error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async processImages(inputFiles, outputDir, settings, progressCallback) {
    const results = [];
    let processed = 0;

    for (const inputFile of inputFiles) {
      const filename = path.basename(inputFile);
      const nameWithoutExt = path.parse(filename).name;
      const outputFilename = `${nameWithoutExt}.${settings.format}`;
      const outputPath = path.join(outputDir, outputFilename);

      const result = await this.processImage(inputFile, outputPath, settings);

      results.push({
        filename,
        outputFilename,
        ...result
      });

      processed++;

      if (progressCallback) {
        progressCallback(processed, inputFiles.length);
      }
    }

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    const totalOriginalSize = results.reduce((sum, r) => sum + (r.originalSize || 0), 0);
    const totalCompressedSize = results.reduce((sum, r) => sum + (r.compressedSize || 0), 0);

    logger.success(`Batch processing complete: ${successful} successful, ${failed} failed`);

    return {
      results,
      summary: {
        total: inputFiles.length,
        successful,
        failed,
        totalOriginalSize,
        totalCompressedSize,
        totalReduction: totalOriginalSize > 0
          ? Math.round(((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100)
          : 0
      }
    };
  }

  async validateImage(filePath) {
    try {
      const metadata = await sharp(filePath).metadata();
      return {
        valid: true,
        format: metadata.format,
        width: metadata.width,
        height: metadata.height,
        size: metadata.size
      };
    } catch (error) {
      logger.warn(`Invalid image file: ${filePath}`, error.message);
      return {
        valid: false,
        error: error.message
      };
    }
  }

  getSupportedFormats() {
    return Object.keys(this.formatConfigs);
  }
}

module.exports = new ImageProcessor();
