import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../../utils/responseHandler';

export const checkRole =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      errorResponse(
        res,
        403,
        'You do not have permission to access this resource'
      );
      return;
    }

    next();
  };
