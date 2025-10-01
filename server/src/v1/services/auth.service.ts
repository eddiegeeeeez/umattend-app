import GoogleAuth from '../../utils/googleAuth.js';
import authRepository from '../repositories/auth.repository.js';
import studentRepository from '../repositories/student.repository.js';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '@/utils/jwt.utils';
import {
  EmptyTokenError,
  AuthenticationError,
  NotFoundError,
} from '../../utils/customErrors';
import { verifyHashedRefreshToken } from '../../utils/tokenHashing.js';
import { RefreshTokenPayload } from '../interface/token.js';
import { truncateIp } from '../../utils/truncateIP.js';

const googleAuth = async (
  googleToken: string,
  ip_address: string,
  userAgent: string
) => {
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

  const student = await studentRepository.getStudentByUserId(user.id);

  const access_token = generateAccessToken({
    user_id: user.id,
    umindanao_email: user.id,
    role: user.id,
    student_id: Number(student?.student_id),
    first_name: student?.first_name,
    last_name: student?.last_name,
    department: student?.department,
    program: student?.program,
  });

  const refresh_token = await generateRefreshToken(
    user.id,
    ip_address,
    userAgent
  );

  return { access_token, refresh_token, user };
};

const googleAuthWithCode = async (
  code: string,
  state: string,
  ip_address: string,
  userAgent: string
) => {
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

  const student = await studentRepository.getStudentByUserId(user.id);

  const access_token = generateAccessToken({
    user_id: user.id,
    umindanao_email: user.id,
    role: user.id,
    student_id: Number(student?.student_id),
    first_name: student?.first_name,
    last_name: student?.last_name,
    department: student?.department,
    program: student?.program,
  });

  const refresh_token = await generateRefreshToken(
    user.id,
    ip_address,
    userAgent
  );

  return { access_token, refresh_token, user };
};

const refreshAccessToken = async (refreshToken: string) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!REFRESH_TOKEN_SECRET) {
    throw new Error('Refresh token secret not configured');
  }

  const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
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

const logoutUser = async (
  refresh_token: string,
  ip_address: string,
  user_agent: string
) => {
  if (!refresh_token) {
    throw new EmptyTokenError('Refresh token is required');
  }

  const SECRET = process.env.JWT_REFRESH_TOKEN_SECRET as string;

  let verifyToken: RefreshTokenPayload;

  let expiredAt: Date | undefined;

  try {
    verifyToken = jwt.verify(refresh_token, SECRET) as RefreshTokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      expiredAt = error.expiredAt;

      throw new jwt.TokenExpiredError('Refresh token has expired', expiredAt);
    }

    throw new AuthenticationError('Invalid refresh token format');
  }

  if (!verifyToken) {
    throw new jwt.TokenExpiredError(
      'Invalid or expired refresh token',
      expiredAt ?? new Date()
    );
  }

  const verifyTokenDBExist = await authRepository.verifyRefreshToken(
    verifyToken.token_id
  );

  if (!verifyTokenDBExist) {
    throw new NotFoundError('Refresh token not found');
  }

  if (!verifyTokenDBExist.is_active) {
    throw new AuthenticationError('Refresh token has been revoked');
  }

  if (new Date(verifyTokenDBExist.expires_at) < new Date()) {
    throw new jwt.TokenExpiredError(
      'Refresh token has expired',
      verifyTokenDBExist.expires_at
    );
  }

  if (
    verifyTokenDBExist.ip_address !== truncateIp(ip_address) ||
    verifyTokenDBExist.user_agent !== user_agent
  ) {
    throw new AuthenticationError('Refresh token is not valid for this device');
  }

  const validateHashedToken = await verifyHashedRefreshToken(
    refresh_token,
    verifyTokenDBExist.token_hash
  );

  if (!validateHashedToken) {
    throw new AuthenticationError('Invalid refresh token');
  }

  await authRepository.revokeRefreshToken(verifyToken.token_id);
};

const authServices = {
  googleAuth,
  googleAuthWithCode,
  refreshAccessToken,
  logoutUser,
};

export default authServices;
