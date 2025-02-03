"use server"

import { Goal } from '@prisma/client';
import { DatabaseHandler } from './PrismaService';

export class GoalDatabaseHandler {
    // Create a goal
    public static async createGoal(data: Goal): Promise<Goal> {
      try {
        return await DatabaseHandler.getInstance().create('goal', data);
      } catch (error) {
        console.error('[GoalDatabaseHandler] CREATE Error:', error);
        throw error;
      }
    }

    // Find goals based on criteria
    public static async findGoals(where: any, include?: any): Promise<Goal[]> {
      try {
        return await DatabaseHandler.getInstance().find('goal', where, include);
      } catch (error) {
        console.error('[GoalDatabaseHandler] READ Error:', error);
        throw error;
      }
    }

    // Update a goal by ID
    public static async updateGoal(id: string | number, data: any): Promise<Goal> {
      try {
        return await DatabaseHandler.getInstance().update('goal', id, data);
      } catch (error) {
        console.error('[GoalDatabaseHandler] UPDATE Error:', error);
        throw error;
      }
    }

    // Delete a goal by ID
    public static async deleteGoal(id: string | number): Promise<Goal> {
      try {
        return await DatabaseHandler.getInstance().delete('goal', id);
      } catch (error) {
        console.error('[GoalDatabaseHandler] DELETE Error:', error);
        throw error;
      }
    }

    // Execute raw SQL query for the goal model
    public static async executeRawQuery(query: string, params?: any[]): Promise<any> {
      try {
        return await DatabaseHandler.getInstance().executeRawQuery(query, params);
      } catch (error) {
        console.error('[GoalDatabaseHandler] RAW_QUERY Error:', error);
        throw error;
      }
    }

    // Check database connection
    public static async ping(): Promise<boolean> {
      try {
        return await DatabaseHandler.getInstance().ping();
      } catch (error) {
        console.error('[GoalDatabaseHandler] Connection failed:', error);
        return false;
      }
    }

    // Fetch goals by company and filter by frequency
    public static getGoalsByFrequency = async (companyId: string, frequency: string): Promise<any[] | null> => {
        try { 
            return await DatabaseHandler
                .getInstance()
                .find('goal', 
                    {
                        companyId: companyId, 
                        frequency: frequency
                    }, 
                    {
                        prograssLogs: true
                    }) as any

        } catch (error) {
          console.error('[GoalDatabaseHandler] get goals by frequency failed:', error);
          return null;
        }   
    }
}
