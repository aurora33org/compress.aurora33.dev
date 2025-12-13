import { NextRequest, NextResponse } from 'next/server';
import { jobManager } from '@/lib/services';
import { NotFoundError } from '@/lib/utils/errors';

/**
 * GET /api/jobs/:jobId/status
 * Get the current status and progress of a job
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    const stats = jobManager.getJobStats(jobId);

    if (!stats) {
      throw new NotFoundError('Job');
    }

    return NextResponse.json({
      success: true,
      ...stats
    });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    return NextResponse.json(
      { success: false, error: error.message },
      { status: statusCode }
    );
  }
}
