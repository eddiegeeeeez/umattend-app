import prisma from '../../configs/prisma.config';
import { CreateUserTypes } from '@/types/auth';

const createUser = async (userData: CreateUserTypes) => {
  return await prisma.user.create({
    data: {
      last_login_at: new Date(),
      ...userData,
    },
  });
};

const verifyRefreshToken = async (tokenID: string) => {
  const refreshToken = await prisma.refresh_token.findUnique({
    where: { id: tokenID },
  });
  return refreshToken;
};

const revokeRefreshToken = async (tokenID: string) => {
  const updatedToken = await prisma.refresh_token.update({
    where: { id: tokenID },
    data: {
      is_active: false,
      revoked_at: new Date(),
    },
  });

  return updatedToken;
};

const authRepository = {
  createUser,
  verifyRefreshToken,
  revokeRefreshToken,
};

export default authRepository;
