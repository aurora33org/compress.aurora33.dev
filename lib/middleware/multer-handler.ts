import multer from 'multer';
import path from 'path';
import { config } from '../config';
import { logger } from '../utils/logger';

/**
 * Create Multer instance for handling file uploads
 */
export function createUploadMiddleware(uploadDir: string) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    }
  });

  const fileFilter = (req: any, file: any, cb: any) => {
    if (!config.upload.allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error(`Invalid file type: ${file.mimetype}`), false);
    }
    cb(null, true);
  };

  return multer({
    storage,
    limits: {
      fileSize: config.upload.maxFileSize,
      files: config.upload.maxFiles
    },
    fileFilter
  });
}

/**
 * Run middleware and return parsed files
 */
export async function parseMultipartForm(
  request: Request,
  uploadDir: string
): Promise<{ files: File[]; error?: string }> {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (!files || files.length === 0) {
      return { files: [], error: 'No files provided' };
    }

    // Validate file count
    if (files.length > config.upload.maxFiles) {
      return { files: [], error: `Maximum ${config.upload.maxFiles} files allowed` };
    }

    // Validate individual files
    for (const file of files) {
      if (file.size > config.upload.maxFileSize) {
        const maxSizeMB = (config.upload.maxFileSize / 1024 / 1024).toFixed(0);
        return {
          files: [],
          error: `File ${file.name} exceeds maximum size of ${maxSizeMB}MB`
        };
      }

      if (!config.upload.allowedMimeTypes.includes(file.type)) {
        return {
          files: [],
          error: `File ${file.name} has invalid MIME type: ${file.type}`
        };
      }
    }

    return { files };
  } catch (error: any) {
    logger.error('Multipart parsing error:', error.message);
    return { files: [], error: error.message };
  }
}
