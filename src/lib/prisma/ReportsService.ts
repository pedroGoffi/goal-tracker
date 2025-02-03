import { Report } from '@prisma/client';
import { DatabaseHandler } from './PrismaService';

export class ReportDatabaseHandler {
    // Create a report
    public static async createReport(data: Report): Promise<Report> {
        try {
            return await DatabaseHandler.getInstance().create('report', data);
        } catch (error) {
            console.error('[ReportDatabaseHandler] CREATE Error:', error);
            throw error;
        }
    }

    // Find reports based on criteria
    public static async findReports(where: any, include?: any): Promise<Report[]> {
        try {
            return await DatabaseHandler.getInstance().find('report', where, include);
        } catch (error) {
            console.error('[ReportDatabaseHandler] READ Error:', error);
            throw error;
        }
    }

    // Update a report by ID
    public static async updateReport(id: string | number, data: any): Promise<Report> {
        try {
            return await DatabaseHandler.getInstance().update('report', id, data);
        } catch (error) {
            console.error('[ReportDatabaseHandler] UPDATE Error:', error);
            throw error;
        }
    }

    // Delete a report by ID
    public static async deleteReport(id: string | number): Promise<Report> {
        try {
            return await DatabaseHandler.getInstance().delete('report', id);
        } catch (error) {
            console.error('[ReportDatabaseHandler] DELETE Error:', error);
            throw error;
        }
    }

    // Execute raw SQL query for the report model
    public static async executeRawQuery(query: string, params?: any[]): Promise<any> {
        try {
            return await DatabaseHandler.getInstance().executeRawQuery(query, params);
        } catch (error) {
            console.error('[ReportDatabaseHandler] RAW_QUERY Error:', error);
            throw error;
        }
    }

    // Check database connection
    public static async ping(): Promise<boolean> {
        try {
            return await DatabaseHandler.getInstance().ping();
        } catch (error) {
            console.error('[ReportDatabaseHandler] Connection failed:', error);
            return false;
        }
    }

    // Fetch reports by company and filter by status
    public static getReportsByStatus = async (companyId: string, status: string): Promise<Report[] | null> => {
        try { 
            return await DatabaseHandler
                .getInstance()
                .find('report', 
                    {
                        companyId: companyId, 
                        status: status
                    }) as Report[];
        } catch (error) {
            console.error('[ReportDatabaseHandler] get reports by status failed:', error);
            return null;
        }
    }

    // Fetch reports by company and filter by date range
    public static getReportsByDateRange = async (companyId: string, dateRange: { startDate: string, endDate: string }): Promise<Report[] | null> => {
        try {
            return await DatabaseHandler
                .getInstance()
                .find('report',
                    {
                        companyId: companyId,
                        createdAt: {
                            gte: new Date(dateRange.startDate),
                            lte: new Date(dateRange.endDate)
                        }
                    }) as Report[];
        } catch (error) {
            console.error('[ReportDatabaseHandler] get reports by date range failed:', error);
            return null;
        }
    }
}
