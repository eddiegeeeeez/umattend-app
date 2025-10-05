import userRepository from '../repositories/user.repository';
import { AuthenticationError, NotFoundError } from '../../utils/customErrors';
import {
  FetchUserInfoResult,
  OnboardedUserInfoResult,
} from '../interface/auth';

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

const checkIsUserDoneOnboarding = async (
  user_id: string
): Promise<OnboardedUserInfoResult | null> => {
  const user = userRepository.isUserDoneOnboarding(user_id);
  if (!user) {
    throw new AuthenticationError('User not onboarded');
  }
  return user;
};

const onboardUser = async (
  user_id: string,
  department: string,
  program: string
): Promise<OnboardedUserInfoResult | null> => {
  const user = await userRepository.onboardUser(user_id, department, program);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  return user;
  
};
const userService = {
  getUserById,
  checkIsUserDoneOnboarding,
  onboardUser
};

export default userService;
