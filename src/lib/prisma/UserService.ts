import { User } from '@prisma/client';
import { DatabaseHandler } from './PrismaService';

// Create a user
export async function createUser(data: User): Promise<User> {
  try {
    return await DatabaseHandler.getInstance().create('user', data);
  } catch (error) {
    console.error('[UserDatabaseHandler] CREATE Error:', error);
    throw error;
  }
}

// Find users based on criteria
export async function findUsers(where: any, include?: any): Promise<User[]> {
  try {
    return await DatabaseHandler.getInstance().find('user', where, include);
  } catch (error) {
    console.error('[UserDatabaseHandler] READ Error:', error);
    throw error;
  }
}

// Update a user by ID
export async function updateUser(id: string | number, data: any): Promise<User> {
  try {
    return await DatabaseHandler.getInstance().update('user', id, data);
  } catch (error) {
    console.error('[UserDatabaseHandler] UPDATE Error:', error);
    throw error;
  }
}

// Delete a user by ID
export async function deleteUser(id: string | number): Promise<User> {
  try {
    return await DatabaseHandler.getInstance().delete('user', id);
  } catch (error) {
    console.error('[UserDatabaseHandler] DELETE Error:', error);
    throw error;
  }
}

// Execute raw SQL query for the user model
export async function executeRawQuery(query: string, params?: any[]): Promise<any> {
  try {
    return await DatabaseHandler.getInstance().executeRawQuery(query, params);
  } catch (error) {
    console.error('[UserDatabaseHandler] RAW_QUERY Error:', error);
    throw error;
  }
}

// Check database connection
export async function ping(): Promise<boolean> {
  try {
    return await DatabaseHandler.getInstance().ping();
  } catch (error) {
    console.error('[UserDatabaseHandler] Connection failed:', error);
    return false;
  }
}

// Fetch users by company and filter by role
export async function getUsersByRole(companyId: string, role: string): Promise<User[] | null> {
  try {
    return await DatabaseHandler.getInstance().find(
      'user',
      { companyId, role },
      { goals: true, progressLogs: true }
    ) as User[];
  } catch (error) {
    console.error('[UserDatabaseHandler] Get users by role failed:', error);
    return null;
  }
}

// Fetch users by department
export async function getUsersByDepartment(departmentId: string): Promise<User[] | null> {
  try {
    return await DatabaseHandler.getInstance().find(
      'user',
      { departmentId },
      { goals: true, progressLogs: true }
    ) as User[];
  } catch (error) {
    console.error('[UserDatabaseHandler] Get users by department failed:', error);
    return null;
  }
}
