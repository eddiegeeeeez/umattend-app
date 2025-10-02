import prisma from '../../configs/prisma.config';
import { CreateUserTypes } from '@/v1/types/auth';

interface UpdateUserTypes {
  google_id?: string;
  profile_picture?: string;
}

const findUserByGoogleId = async (google_id: string) => {
  return await prisma.user.findUnique({
    where: { google_id: google_id },
  });
};

const createUser = async (user_data: CreateUserTypes) => {
  return await prisma.user.create({
    data: {
      umindanao_email: user_data.umindanao_email,
      google_id: user_data.google_id,
      role: user_data.role,
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

const authRepository = {
  createUser,
  updateUser,
  findUserByEmail,
  findUserByGoogleId,
  findRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  getUserById,
};

export default authRepository;
