import prisma from '../../configs/prisma.config';
import { CreateUserTypes } from '@/v1/types/auth';
import redis from '../../configs/redis.config';

interface UpdateUserTypes {
  google_id?: string;
  profile_picture?: string;
}

const findUserByGoogleId = async (google_id: string) => {
  return await prisma.user.findUnique({
    where: { google_id },
    include: {
      student: {
        select: {
          student_id: true,
          name: true,
          department: true,
          program: true,
          profile_picture: true,
        },
      },
    },
  });
};

const createUser = async (user_data: CreateUserTypes) => {
  return await prisma.user.create({
    data: {
      umindanao_email: user_data.umindanao_email,
      google_id: user_data.google_id,
      role: user_data.role,
      last_login_at: new Date(),
      student: {
        create: {
          name: user_data.name,
          student_id: user_data.student_id,
          profile_picture: user_data.profile_picture,
        },
      },
    },
    include: {
      student: true,
    },
  });
};

const updateLoginAndProfile = async (
  user_id: string,
  profile_picture: string
) => {
  await prisma.user.update({
    where: { id: user_id },
    data: {
      last_login_at: new Date(),
      student: {
        update: {
          profile_picture,
        },
      },
    },
  });
};

const findUserByEmail = async (umindanao_email: string) => {
  return await prisma.user.findUnique({
    where: { umindanao_email },
  });
};

const getUserById = async (user_id: string) => {
  return await prisma.user.findUnique({
    where: { id: user_id },
    include: { student: true },
  });
};

const updateUser = async (user_id: string, updated_data: UpdateUserTypes) => {
  return await prisma.user.update({
    where: { id: user_id },
    data: updated_data,
    include: { student: true },
  });
};

const verifyRefreshToken = async (tokenID: string) => {
  return await prisma.refresh_token.findUnique({
    where: { id: tokenID },
  });
};

const findRefreshToken = async (token_id: string) => {
  return await prisma.refresh_token.findFirst({
    where: { id: token_id, is_active: true },
    include: { user: { include: { student: true } } },
  });
};

const revokeRefreshToken = async (token_id: string) => {
  return await prisma.refresh_token.update({
    where: { id: token_id, is_active: true },
    data: { is_active: false, revoked_at: new Date() },
  });
};

const createErrorCode = async (error_code: string, error_message: string) => {
  return await redis.setex(
    `error_code:${error_code}`,
    60,
    JSON.stringify({
      error_message: error_message,
    })
  );
};

const getErrorCode = async (error_code: string) => {
  return await redis.get(`error_code:${error_code}`);
};

const deleteErrorCode = async (error_code: string) => {
  return await redis.del(`error_code:${error_code}`);
};

const createAuthCode = async (
  auth_code: string,
  access_token: string,
  refresh_token: string
) => {
  return await redis.setex(
    `auth_code:${auth_code}`,
    60,
    JSON.stringify({
      access_token: access_token,
      refresh_token: refresh_token,
    })
  );
};

const getAuthCode = async (auth_code: string) => {
  return await redis.get(`auth_code:${auth_code}`);
};

const deleteAuthCode = async (auth_code: string) => {
  return await redis.del(`auth_code:${auth_code}`);
};

const authRepository = {
  createUser,
  updateUser,
  getUserById,
  findUserByEmail,
  findUserByGoogleId,
  updateLoginAndProfile,
  findRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  createErrorCode,
  getErrorCode,
  deleteErrorCode,
  createAuthCode,
  getAuthCode,
  deleteAuthCode,
};

export default authRepository;
