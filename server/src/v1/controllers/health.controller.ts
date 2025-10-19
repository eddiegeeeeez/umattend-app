import { Request, Response } from 'express';
import prisma from '../../configs/prisma.config';
import { NODE_ENV } from '../../constants/app.constants';

/**
 * Basic health check endpoint
 * Returns 200 if server is running
 */
export const getHealth = async (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
  });
};

/**
 * Detailed health check endpoint
 * Includes database connectivity and system information
 */
export const getHealthDetailed = async (req: Request, res: Response) => {
  const healthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
    server: {
      nodeVersion: process.version,
      platform: process.platform,
      memory: {
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        external: Math.round(process.memoryUsage().external / 1024 / 1024) + ' MB',
      },
      cpu: process.cpuUsage(),
    },
    database: {
      status: 'unknown',
      responseTime: 0,
    },
  };

  // Check database connectivity
  try {
    const start = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const end = Date.now();
    
    healthCheck.database.status = 'connected';
    healthCheck.database.responseTime = end - start;
  } catch (error) {
    healthCheck.status = 'degraded';
    healthCheck.database.status = 'disconnected';
    console.error('Database health check failed:', error);
  }

  const statusCode = healthCheck.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(healthCheck);
};
