import { Request, Response } from 'express';
import userService from '../services/user.service';
import {
  HTTPErrorResponse,
  HTTPSuccessResponse,
} from '@/utils/responseHandler';
import { NotFoundError } from '../../utils/customErrors';
import { generateAccessToken } from '@/utils/jwt.utils';
import { NODE_ENV } from '@/constants/app.constants';

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
    if (!department || !program) {
      return HTTPErrorResponse(res, 400, 'Missing Fields');
    }
    const user = await userService.onboardUser(user_id, department, program);
    if (!user) {
      return HTTPErrorResponse(res, 404, 'User not found') as Response;
    }
    const access_token = generateAccessToken({
      user_id: user.id,
      umindanao_email: user.umindanao_email,
      role: user.role,
      student_id: Number(user.student?.student_id),
      name: user.student?.name,
      department: user.student?.department ?? '',
      program: user.student?.program ?? '',
    });
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: NODE_ENV === 'PRODUCTION',
      sameSite: 'strict',
      maxAge: 1 * 60 * 60 * 1000,
    });
    return HTTPSuccessResponse(res, 200, 'User succesfully updated', {
      ...user,
      access_token,
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
