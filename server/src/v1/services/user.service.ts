import userRepository from '../repositories/user.repository';
import { NotFoundError } from '../../utils/customErrors';
import { FetchUserInfoResult } from '../interface/auth';

const getUserById = async (user_id: string): Promise<FetchUserInfoResult> => {
  const user = await userRepository.findUserById(user_id);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  return {
    id: user.id,
    umindanao_email: user.umindanao_email,
    done_onboarding: user.done_onboarding,
    role: user.role,
  };
};

const userService = {
  getUserById,
};

export default userService;
