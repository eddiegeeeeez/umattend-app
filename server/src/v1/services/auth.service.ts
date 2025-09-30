import GoogleAuth from '../../utils/googleAuth.js';
import authRepository from '../repositories/auth.repository.js';
import Jwt from 'jsonwebtoken';
import { generateAccessToken } from '@/utils/jwt.utils.js';

const googleAuth = async (googleToken: string) => {
  const googleUser = await GoogleAuth.verifyGoogleToken(googleToken);

  let user = await authRepository.findUserByGoogleId(googleUser.google_id);

  if (!user) {
    user = (await authRepository.findUserByEmail(
      googleUser.email as string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    )) as any;

    if (user) {
      user = await authRepository.updateUser(user.id, {
        google_id: googleUser.google_id,
        profile_picture: googleUser.profile_picture,
      });
    } else {
      user = await authRepository.createUser({
        umindanao_email: googleUser.email as string,
        google_id: googleUser.google_id as string,
        role: 'student',
      });
    }
  }

  return user;
};

const googleAuthWithCode = async (code: string, state: string) => {
  const googleUser = await GoogleAuth.exchangeCodeForUserInfo(code, state);

  let user = await authRepository.findUserByGoogleId(googleUser.google_id);

  if (!user) {
    const existingUser = await authRepository.findUserByEmail(googleUser.email);

    if (existingUser) {
      const error = new Error('ACCOUNT_LINKING_REQUIRED');
      throw error;
    } else {
      user = await authRepository.createUser({
        umindanao_email: googleUser.email,
        google_id: googleUser.google_id,
        role: 'student',
      });
    }
  }

  return user;
};

const refreshAccessToken = async (refreshToken: string) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!REFRESH_TOKEN_SECRET) {
    throw new Error('Refresh token secret not configured');
  }

  const decoded = Jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
    id: string;
  };

  const token = await authRepository.findRefreshToken(decoded.id);

  if (!token) {
    throw new Error('Invalid refresh token');
  }

  if (token.expires_at < new Date()) {
    await authRepository.revokeRefreshToken(refreshToken);
    throw new Error('Refresh token expired');
  }

  const access_token = generateAccessToken({
    user_id: token.user.id,
    umindanao_email: token.user.id,
    role: token.user.id,
    student_id: token.user.student?.student_id as number,
    first_name: token.user.student?.first_name as string,
    last_name: token.user.student?.last_name as string,
    department: token.user.student?.department as string,
    program: token.user.student?.program as string,
  });

  return access_token;
};

const authServices = {
  googleAuth,
  googleAuthWithCode,
  refreshAccessToken,
};

export default authServices;
