import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { jobManager, storageService } from '@/lib/services';
import { NotFoundError, BadRequestError } from '@/lib/utils/errors';
import { logger } from '@/lib/utils/logger';

/**
 * GET /api/jobs/:jobId/download
 * Download the processed images as a ZIP file
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
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

    // Read file and return as response
    const fileBuffer = await fs.readFile(zipPath);

    const response = new NextResponse(fileBuffer);
    response.headers.set('Content-Disposition', `attachment; filename="compressed-images-${jobId}.zip"`);
    response.headers.set('Content-Type', 'application/zip');
    response.headers.set('Content-Length', fileBuffer.length.toString());
    return response;
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    logger.error('Download error:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: statusCode }
    );
  }
}
