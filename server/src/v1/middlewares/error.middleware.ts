import { Request, Response, NextFunction } from 'express';
import { CustomError } from '@/types/error';


export const errorHandler = (err: CustomError, req: Request, res: Response) => {
  const statusCode = err.statusCode ?? res.statusCode ?? 500;

  const response = {
    success: false,
    message:
      process.env.NODE_ENV === 'DEVELOPMENT'
        ? err.message
        : 'Something went wrong. Please try again later.',
    ...(process.env.NODE_ENV === 'DEVELOPMENT' && {
      stack: err.stack,
    }),
  };

  return res.status(statusCode).json(response);
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`) as CustomError;
  error.statusCode = 404;
  next(error);
};
