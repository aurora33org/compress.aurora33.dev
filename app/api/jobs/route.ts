import { NextResponse } from 'next/server';
import { jobManager, storageService } from '@/lib/services';
import { logger } from '@/lib/utils/logger';

/**
 * POST /api/jobs
 * Create a new compression job
 */
export async function POST() {
  try {
    const job = jobManager.createJob();
    await storageService.createJobDirectories(job.id);

    logger.success(`Created job: ${job.id}`);

    return NextResponse.json({
      success: true,
      jobId: job.id,
      message: 'Job created successfully'
    }, { status: 201 });
  } catch (error: any) {
    logger.error('Failed to create job:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/jobs
 * Get all jobs (debugging/monitoring only)
 */
export async function GET() {
  try {
    const jobs = jobManager.getAllJobs();
    return NextResponse.json({
      success: true,
      jobs
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
