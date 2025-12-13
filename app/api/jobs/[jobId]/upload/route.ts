import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { jobManager, storageService } from '@/lib/services';
import { parseMultipartForm } from '@/lib/middleware/multer-handler';
import { NotFoundError, BadRequestError } from '@/lib/utils/errors';
import { logger } from '@/lib/utils/logger';

/**
 * POST /api/jobs/:jobId/upload
 * Upload image files for a compression job
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    const job = jobManager.getJob(jobId);

    if (!job) {
      throw new NotFoundError('Job');
    }

    if (job.status !== 'created') {
      throw new BadRequestError(`Cannot upload to job in status: ${job.status}`);
    }

    const uploadDir = storageService.getUploadDir(jobId);

    // Update job status
    jobManager.setJobStatus(jobId, 'uploading');

    // Parse multipart form data
    const { files, error } = await parseMultipartForm(request, uploadDir);

    if (error) {
      jobManager.setJobStatus(jobId, 'failed', error);
      throw new BadRequestError(error);
    }

    if (!files || files.length === 0) {
      throw new BadRequestError('No files were uploaded');
    }

    // Save uploaded files to disk
    let totalSize = 0;
    const uploadedFiles: any[] = [];

    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(uploadDir, filename);

      await fs.writeFile(filepath, Buffer.from(buffer));

      jobManager.addUploadedFile(jobId, filename, file.size);
      uploadedFiles.push({
        filename,
        size: file.size,
        mimetype: file.type
      });
      totalSize += file.size;
    }

    // Update job status
    jobManager.setJobStatus(jobId, 'uploaded');

    // Save metadata
    await storageService.saveMetadata(jobId, {
      uploadedAt: Date.now(),
      fileCount: files.length,
      totalSize
    });

    logger.success(`Uploaded ${files.length} files for job ${jobId}`);

    return NextResponse.json({
      success: true,
      filesUploaded: files.length,
      totalSize,
      files: uploadedFiles
    });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    logger.error('Upload error:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: statusCode }
    );
  }
}
