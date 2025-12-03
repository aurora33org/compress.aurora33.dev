const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

class ZipService {
  async createZip(sourceDir, outputPath) {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(outputPath);
      const archive = archiver('zip', {
        zlib: { level: 9 } // Maximum compression
      });

      output.on('close', () => {
        const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
        logger.info(`ZIP created: ${outputPath} (${sizeInMB} MB)`);
        resolve({
          success: true,
          path: outputPath,
          size: archive.pointer()
        });
      });

      output.on('error', (error) => {
        logger.error('ZIP output stream error:', error);
        reject(error);
      });

      archive.on('error', (error) => {
        logger.error('ZIP archive error:', error);
        reject(error);
      });

      archive.on('warning', (warning) => {
        if (warning.code === 'ENOENT') {
          logger.warn('ZIP warning:', warning);
        } else {
          reject(warning);
        }
      });

      archive.pipe(output);
      archive.directory(sourceDir, false);
      archive.finalize();
    });
  }

  async createZipFromFiles(files, outputPath) {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(outputPath);
      const archive = archiver('zip', {
        zlib: { level: 9 }
      });

      output.on('close', () => {
        logger.info(`ZIP created from ${files.length} files`);
        resolve({
          success: true,
          path: outputPath,
          size: archive.pointer()
        });
      });

      output.on('error', reject);
      archive.on('error', reject);

      archive.pipe(output);

      files.forEach(({ filePath, name }) => {
        archive.file(filePath, { name: name || path.basename(filePath) });
      });

      archive.finalize();
    });
  }
}

module.exports = new ZipService();
