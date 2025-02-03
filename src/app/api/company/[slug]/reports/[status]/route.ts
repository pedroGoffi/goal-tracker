// src/app/api/company-reports/[slug]/[status]/route.ts

"use server"

import { ReportDatabaseHandler } from '@/lib/prisma/ReportsService';
import { NextResponse } from 'next/server';

interface ReportRequestBody {
  dateRange?: { startDate: string; endDate: string };
}

// POST method for creating a report and fetching reports based on status
export async function POST(req: Request, { params }: any) {
  const { slug, status } = params;

  try {
    // Parse the request body (e.g., for filtering reports by dateRange)
    const body: ReportRequestBody = await req.json();
    const { dateRange } = body;

    // If dateRange is provided, fetch reports based on status and date range
    if (dateRange) {
      const reports = await ReportDatabaseHandler.getReportsByDateRange(slug, dateRange);

      // If reports are found, return them
      if (reports) {
        return NextResponse.json({ reports }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'No reports found for this date range.' }, { status: 404 });
      }
    } else {
      // If no dateRange, fetch reports based on status
      const reports = await ReportDatabaseHandler.getReportsByStatus(slug, status);

      // If reports are found, return them
      if (reports) {
        return NextResponse.json({ reports }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'No reports found for this status.' }, { status: 404 });
      }
    }

  } catch (error) {
    console.error('[Report POST Error]:', error);
    return NextResponse.json({ message: 'An error occurred while processing the request.' }, { status: 500 });
  }
}
