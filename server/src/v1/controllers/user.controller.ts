import { Request, Response } from 'express';
import userService from '../services/user.service';
import {
  HTTPErrorResponse,
  HTTPSuccessResponse,
} from '@/utils/responseHandler';
import { NotFoundError } from '../../utils/customErrors';

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as { id: string };
    const user = await userService.getUserById(id);

    if (!user) {
      return HTTPErrorResponse(res, 404, 'User not found') as Response;
    }

    return HTTPSuccessResponse(res, 200, 'User succesfully fetched', {
      user,
    }) as Response;
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      return HTTPErrorResponse(res, 404, error.message) as Response;
    }

    return HTTPErrorResponse(res, 500, 'Internal server error') as Response;
  }
};

const onboardUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.user.id;
    const { department, program } = req.body;
    const user = await userService.onboardUser(user_id, department, program);
    if (!user) {
      return HTTPErrorResponse(res, 404, 'User not found') as Response;
    }
    return HTTPSuccessResponse(res, 200, 'User succesfully updated', {
      user,
    }) as Response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return HTTPErrorResponse(res, 500, error.message);
    }
    return HTTPErrorResponse(res, 500, error);
  }
};
const userController = {
  getUserById,
  onboardUser,
};

export default userController;
