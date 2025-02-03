import { CompanySettings } from '@prisma/client';
import { DatabaseHandler } from './PrismaService';

export class CompanySettingsDatabaseHandler {
    // Create company settings
    public static async createCompanySettings(data: CompanySettings): Promise<CompanySettings> {
      try {
        return await DatabaseHandler.getInstance().create('companySettings', data);
      } catch (error) {
        console.error('[CompanySettingsDatabaseHandler] CREATE Error:', error);
        throw error;
      }
    }

    // Find company settings based on criteria
    public static async findCompanySettings(where: any, include?: any): Promise<CompanySettings[]> {
      try {
        return await DatabaseHandler.getInstance().find('companySettings', where, include);
      } catch (error) {
        console.error('[CompanySettingsDatabaseHandler] READ Error:', error);
        throw error;
      }
    }

    // Update company settings by ID
    public static async updateCompanySettings(id: string | number, data: any): Promise<CompanySettings> {
      try {
        return await DatabaseHandler.getInstance().update('companySettings', id, data);
      } catch (error) {
        console.error('[CompanySettingsDatabaseHandler] UPDATE Error:', error);
        throw error;
      }
    }

    // Delete company settings by ID
    public static async deleteCompanySettings(id: string | number): Promise<CompanySettings> {
      try {
        return await DatabaseHandler.getInstance().delete('companySettings', id);
      } catch (error) {
        console.error('[CompanySettingsDatabaseHandler] DELETE Error:', error);
        throw error;
      }
    }

    // Execute raw SQL query for company settings model
    public static async executeRawQuery(query: string, params?: any[]): Promise<any> {
      try {
        return await DatabaseHandler.getInstance().executeRawQuery(query, params);
      } catch (error) {
        console.error('[CompanySettingsDatabaseHandler] RAW_QUERY Error:', error);
        throw error;
      }
    }

    // Check database connection
    public static async ping(): Promise<boolean> {
      try {
        return await DatabaseHandler.getInstance().ping();
      } catch (error) {
        console.error('[CompanySettingsDatabaseHandler] Connection failed:', error);
        return false;
      }
    }
}
