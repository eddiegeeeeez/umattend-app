import { Request, Response, NextFunction } from 'express';
import { HTTPErrorResponse } from '../../utils/responseHandler';

export const onlyAdmin =
  () =>
  (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (user.role === 'admin') {
      HTTPErrorResponse(
        res,
        403,
        'You do not have permission to access this resource'
      );
      return;
    }

    next();
  };
