import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTPErrorResponse } from '@/utils/responseHandler';
import { JWT_ACCESS_TOKEN_SECRET } from '@/constants/jwt.constants';
import { FetchUserInfoResult } from '../interface/auth';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        umindanao_email: string;
        role: string;
      };
    }
  }
}

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

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET) as {
      user_id: string;
      umindanao_email: string;
      role: string;
    };

    if (!decoded) {
      return HTTPErrorResponse(res, 403, 'Invalid token') as Response;
    }

    req.user = {
      id: decoded.user_id,
      umindanao_email: decoded.umindanao_email,
      role: decoded.role,
    } as FetchUserInfoResult;

    return next();
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      return HTTPErrorResponse(res, 401, 'Access token expired') as Response;
    }
    return HTTPErrorResponse(res, 403, 'Invalid token') as Response;
  }
};
