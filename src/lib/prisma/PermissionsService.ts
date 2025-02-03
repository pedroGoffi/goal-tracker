"use server"

import { Permission } from '@prisma/client';
import { DatabaseHandler } from './PrismaService';

export class PermissionDatabaseHandler {
    // Create a permission
    public static async createPermission(data: Permission): Promise<Permission> {
      try {
        return await DatabaseHandler.getInstance().create('permission', data);
      } catch (error) {
        console.error('[PermissionDatabaseHandler] CREATE Error:', error);
        throw error;
      }
    }

    // Find permissions based on criteria
    public static async findPermissions(where: any, include?: any): Promise<Permission[]> {
      try {
        return await DatabaseHandler.getInstance().find('permission', where, include);
      } catch (error) {
        console.error('[PermissionDatabaseHandler] READ Error:', error);
        throw error;
      }
    }

    // Update a permission by ID
    public static async updatePermission(id: string | number, data: any): Promise<Permission> {
      try {
        return await DatabaseHandler.getInstance().update('permission', id, data);
      } catch (error) {
        console.error('[PermissionDatabaseHandler] UPDATE Error:', error);
        throw error;
      }
    }

    // Delete a permission by ID
    public static async deletePermission(id: string | number): Promise<Permission> {
      try {
        return await DatabaseHandler.getInstance().delete('permission', id);
      } catch (error) {
        console.error('[PermissionDatabaseHandler] DELETE Error:', error);
        throw error;
      }
    }

    // Execute raw SQL query for permission model
    public static async executeRawQuery(query: string, params?: any[]): Promise<any> {
      try {
        return await DatabaseHandler.getInstance().executeRawQuery(query, params);
      } catch (error) {
        console.error('[PermissionDatabaseHandler] RAW_QUERY Error:', error);
        throw error;
      }
    }

    // Check database connection
    public static async ping(): Promise<boolean> {
      try {
        return await DatabaseHandler.getInstance().ping();
      } catch (error) {
        console.error('[PermissionDatabaseHandler] Connection failed:', error);
        return false;
      }
    }
}
