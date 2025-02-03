import { Prisma, PrismaClient } from '@prisma/client'

export class DatabaseHandler {
  private static instance: DatabaseHandler;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' 
        ? ['query', 'info', 'warn', 'error'] 
        : ['error']
    });
  }

  public static getInstance(): DatabaseHandler {
    if (!DatabaseHandler.instance) {
      DatabaseHandler.instance = new DatabaseHandler();
    }
    return DatabaseHandler.instance;
  }

  // Generic create method
  public async create<T>(model: string, data: any): Promise<T> {
    try {
      return await (this.prisma as any)[model].create({ data });
    } catch (error) {
      this.handleError('CREATE', model, error);
      throw error;
    }
  }

  // Generic read/find method
  public async find<T>(model: string, where?: any, include?: any): Promise<T[]> {
    try {
      return await (this.prisma as any)[model].findMany({ 
        where, 
        include 
      });
    } catch (error) {
      this.handleError('READ', model, error);
      throw error;
    }
  }

  // Generic update method
  public async update<T>(model: string, id: string | number, data: any): Promise<T> {
    try {
      return await (this.prisma as any)[model].update({
        where: { id },
        data
      });
    } catch (error) {
      this.handleError('UPDATE', model, error);
      throw error;
    }
  }

  // Generic delete method
  public async delete<T>(model: string, id: string | number): Promise<T> {
    try {
      return await (this.prisma as any)[model].delete({
        where: { id }
      });
    } catch (error) {
      this.handleError('DELETE', model, error);
      throw error;
    }
  }

  // Transaction support  
  public async transaction<T>(fn: Prisma.PrismaPromise<any>[]): Promise<T> {
    return this.prisma.$transaction(fn) as T;
  }

  // Error handling with logging
  private handleError(operation: string, model: string, error: any): void {
    console.error(`[DatabaseHandler] ${operation} Error on ${model}:`, error);
  }

  // Cleanup method
  public async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }

  // Raw SQL query support
  public async executeRawQuery(query: string, params?: any[]): Promise<any> {
    try {
      return await this.prisma.$executeRaw`${query}`;
    } catch (error) {
      this.handleError('RAW_QUERY', 'N/A', error);
      throw error;
    }
  }

  // Utility for checking database connection
  public async ping(): Promise<boolean> {
    try {
      await this.prisma.$connect();
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }
}

// Export singleton instance directly
export const db = DatabaseHandler.getInstance();