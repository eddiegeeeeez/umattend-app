import { Request, Response, NextFunction } from 'express';
import { HTTPErrorResponse } from '../../utils/responseHandler';

export const checkRole =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      HTTPErrorResponse(
        res,
        403,
        'You do not have permission to access this resource'
      );
      return;
    }

    next();
  };
