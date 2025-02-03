"use server"

import { Department } from '@prisma/client';
import { DatabaseHandler } from './PrismaService';

export class DepartmentDatabaseHandler {
    // Create a department
    public static async createDepartment(data: Department): Promise<Department> {
      try {
        return await DatabaseHandler.getInstance().create('department', data);
      } catch (error) {
        console.error('[DepartmentDatabaseHandler] CREATE Error:', error);
        throw error;
      }
    }

    // Find departments based on criteria
    public static async findDepartments(where: any, include?: any): Promise<Department[]> {
      try {
        return await DatabaseHandler.getInstance().find('department', where, include);
      } catch (error) {
        console.error('[DepartmentDatabaseHandler] READ Error:', error);
        throw error;
      }
    }

    // Update a department by ID
    public static async updateDepartment(id: string | number, data: any): Promise<Department> {
      try {
        return await DatabaseHandler.getInstance().update('department', id, data);
      } catch (error) {
        console.error('[DepartmentDatabaseHandler] UPDATE Error:', error);
        throw error;
      }
    }

    // Delete a department by ID
    public static async deleteDepartment(id: string | number): Promise<Department> {
      try {
        return await DatabaseHandler.getInstance().delete('department', id);
      } catch (error) {
        console.error('[DepartmentDatabaseHandler] DELETE Error:', error);
        throw error;
      }
    }

    // Execute raw SQL query for department model
    public static async executeRawQuery(query: string, params?: any[]): Promise<any> {
      try {
        return await DatabaseHandler.getInstance().executeRawQuery(query, params);
      } catch (error) {
        console.error('[DepartmentDatabaseHandler] RAW_QUERY Error:', error);
        throw error;
      }
    }

    // Check database connection
    public static async ping(): Promise<boolean> {
      try {
        return await DatabaseHandler.getInstance().ping();
      } catch (error) {
        console.error('[DepartmentDatabaseHandler] Connection failed:', error);
        return false;
      }
    }
}
