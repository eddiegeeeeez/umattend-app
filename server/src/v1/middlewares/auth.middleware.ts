import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../../configs/prisma.config';
import { HTTPErrorResponse } from '@/utils/responseHandler';

/**
 * Middleware to authenticate user based on JWT token.
 * It checks for the presence of a Bearer token in the Authorization header,
 * verifies the token, and retrieves the user from the database.
 * If the user is found and the token is valid, it attaches the user info to the request object.
 * Otherwise, it returns an appropriate error response.
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return HTTPErrorResponse(res, 401, 'No token provided') as Response;
  }

  const token = authHeader.split(' ')[1];

  const SECRET = process.env.JWT_ACCESS_TOKEN_SECRET as string;

  if (!SECRET) {
    return HTTPErrorResponse(
      res,
      500,
      'Server configuration error'
    ) as Response;
  }
  try {
    const decoded = jwt.verify(token, SECRET) as {
      user_id: string;
      email: string;
      role: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.user_id },
    });

    if (!user) {
      return HTTPErrorResponse(res, 403, 'Invalid token') as Response;
    }

    if (user.umindanao_email !== decoded.email || user.role !== decoded.role) {
      return HTTPErrorResponse(res, 403, 'Invalid token') as Response;
    }

    req.user = {
      id: user.id,
      email: user.umindanao_email,
      role: user.role,
    };

    return next();
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      return HTTPErrorResponse(res, 401, 'Access token expired') as Response;
    }
    return HTTPErrorResponse(res, 403, 'Invalid token') as Response;
  }
};
