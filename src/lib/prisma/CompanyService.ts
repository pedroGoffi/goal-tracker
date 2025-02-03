import { Company } from '@prisma/client';
import { DatabaseHandler } from './PrismaService';


export class CompanyDatabaseHandler {
  // Create a company
  public static async createCompany(data: Company): Promise<Company> {
    try {
      return await DatabaseHandler.getInstance().create('company', data);
    } catch (error) {
      console.error('[CompanyDatabaseHandler] CREATE Error:', error);
      throw error;
    }
  }

  // Find companies based on criteria
  public static async findCompany(where: any, include?: any): Promise<Company[]> {
    try {
      return await DatabaseHandler.getInstance().find('company', where, include);
    } catch (error) {
      console.error('[CompanyDatabaseHandler] READ Error:', error);
      throw error;
    }
  }

  // Update a company by ID
  public static async updateCompany(id: string, data: any): Promise<Company> {
    try {
      return await DatabaseHandler.getInstance().update('company', id, data);
    } catch (error) {
      console.error('[CompanyDatabaseHandler] UPDATE Error:', error);
      throw error;
    }
  }

  // Delete a company by ID
  public static async deleteCompany(id: string): Promise<Company> {
    try {
      return await DatabaseHandler.getInstance().delete('company', id);
    } catch (error) {
      console.error('[CompanyDatabaseHandler] DELETE Error:', error);
      throw error;
    }
  }

  // Execute raw SQL query for the company model
  public static async executeRawQuery(query: string, params?: any[]): Promise<any> {
    try {
      return await DatabaseHandler.getInstance().executeRawQuery(query, params);
    } catch (error) {
      console.error('[CompanyDatabaseHandler] RAW_QUERY Error:', error);
      throw error;
    }
  }

  // Check database connection
  public static async ping(): Promise<boolean> {
    try {
      return await DatabaseHandler.getInstance().ping();
    } catch (error) {
      console.error('[CompanyDatabaseHandler] Connection failed:', error);
      return false;
    }
  }
}
