import GoogleAuth from '../../utils/googleAuth.js';
import authRepository from '../repositories/auth.repository.js';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '@/v1/services/jwt.service.js';
import {
  EmptyTokenError,
  AuthenticationError,
  NotFoundError,
} from '../../utils/customErrors';
import { verifyHashedRefreshToken } from '../../utils/tokenHashing.js';
import { RefreshTokenPayload } from '../interface/token.js';
import crypto from 'crypto';
import { JWT_REFRESH_TOKEN_SECRET } from '@/constants/jwt.constants.js';

import { sanitizeKey, extractStudentID } from '@/utils/string.utils.js';
import { sendEmail } from './email.service.js';
const googleAuthWithCode = async (
  code: string,
  state: string,
  ip_address: string,
  userAgent: string
) => {
  const googleUser = await GoogleAuth.exchangeCodeForUserInfo(code, state);

  let user = await authRepository.findUserByGoogleId(googleUser.google_id);

  if (!user) {
    const student_id = Number(extractStudentID(googleUser.email));

    user = await authRepository.createUser({
      umindanao_email: googleUser.email,
      google_id: googleUser.google_id,
      role: 'student',
      student_id: student_id,
      name: googleUser.name,
      profile_picture: googleUser.profile_picture,
    });

    await sendEmail(
      googleUser.email,
      'Welcome to UMAttend!',
      `Hello ${googleUser.name},\n\nWelcome to UMAttend! We're excited to have you on board.\n\nBest regards,\nThe UMAttend Team`,
      `<h1>Hello ${googleUser.name},</h1><p>Welcome to UMAttend! We're excited to have you on board.</p><p>Best regards,<br>The UMAttend Team</p>`
    );

    console.log(user);
  }

  await authRepository.updateLoginAndProfile(
    user.id,
    googleUser.profile_picture
  );

  // Uncomment  if want to test the auth email notification
  // await sendEmail(
  //   user.umindanao_email,
  //   'New Login Alert',
  //   `Hello ${user.student?.name ?? 'User'},\n\nWe noticed a new login to your UMAttend account from IP address: ${ip_address} using ${userAgent}.\n\nIf this was you, no further action is needed. If you did not initiate this login, please secure your account immediately.\n\nBest regards,\nThe UMAttend Team`,
  //   `<h1>Hello ${user.student?.name ?? 'User'},</h1><p>We noticed a new login to your UMAttend account from IP address: ${ip_address} using ${userAgent}.</p><p>If this was you, no further action is needed. If you did not initiate this login, please secure your account immediately.</p><p>Best regards,<br>The UMAttend Team</p>`
  // );

  const access_token = generateAccessToken({
    user_id: user.id,
    umindanao_email: user.umindanao_email,
    role: user.role,
    student_id: Number(user.student?.student_id),
    name: user.student?.name,
    department: user.student?.department ?? '',
    program: user.student?.program ?? '',
  });

  const refresh_token = await generateRefreshToken(
    user.id,
    ip_address,
    userAgent
  );

  return { access_token, refresh_token, user };
};

const refreshAccessToken = async (refresh_token: string) => {
  let token: RefreshTokenPayload;

  let expiredAt: Date | undefined;

  try {
    token = jwt.verify(
      refresh_token,
      JWT_REFRESH_TOKEN_SECRET
    ) as RefreshTokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      expiredAt = error.expiredAt;

      throw new jwt.TokenExpiredError('Refresh token has expired', expiredAt);
    }

    throw new AuthenticationError('Invalid refresh token format');
  }

  const verifyTokenDBExist = await authRepository.verifyRefreshToken(
    token.token_id
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

  const validateHashedToken = await verifyHashedRefreshToken(
    refresh_token,
    verifyTokenDBExist.token_hash
  );

  if (!validateHashedToken) {
    throw new AuthenticationError('Invalid refresh token');
  }

  const user = await authRepository.getUserById(token.user_id);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return generateAccessToken({
    user_id: user.id,
    umindanao_email: user.id,
    role: user.id,
    student_id: user.student?.student_id as number,
    name: user.student?.name as string,
    department: user.student?.department as string,
    program: user.student?.program as string,
  });
};

const logoutUser = async (refresh_token: string) => {
  if (!refresh_token) {
    throw new EmptyTokenError('Refresh token is required');
  }

  let verifyToken: RefreshTokenPayload;

  let expiredAt: Date | undefined;

  try {
    verifyToken = jwt.verify(
      refresh_token,
      JWT_REFRESH_TOKEN_SECRET
    ) as RefreshTokenPayload;
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

  const validateHashedToken = await verifyHashedRefreshToken(
    refresh_token,
    verifyTokenDBExist.token_hash
  );

  if (!validateHashedToken) {
    throw new AuthenticationError('Invalid refresh token');
  }

  await authRepository.revokeRefreshToken(verifyToken.token_id);
};

const generateErrorCode = async (error_message: string) => {
  const error_code = crypto.randomBytes(32).toString('hex');
  await authRepository.createErrorCode(error_code, error_message);
  return error_code;
};

const generateAuthCode = async (
  access_token: string,
  refresh_token: string
) => {
  const auth_code = crypto.randomBytes(32).toString('hex');
  await authRepository.createAuthCode(auth_code, access_token, refresh_token);
  return auth_code;
};

const getDataFromErrorCode = async (error_code: string) => {
  const sanitizedErrorCode = sanitizeKey(error_code);

  const error = await authRepository.getErrorCode(sanitizedErrorCode);

  console.log(error);

  if (!error) {
    throw new NotFoundError('Error code not found');
  }
  await authRepository.deleteErrorCode(sanitizedErrorCode);
  const { error_message } = JSON.parse(error);
  return error_message;
};

const getDataFromAuthCode = async (auth_code: string) => {
  const sanitizedAuthCode = sanitizeKey(auth_code);
  const tokens = await authRepository.getAuthCode(sanitizedAuthCode);
  if (!tokens) {
    throw new NotFoundError('Auth code not found');
  }
  await authRepository.deleteAuthCode(sanitizedAuthCode);
  const { access_token, refresh_token } = JSON.parse(tokens);
  return { access_token, refresh_token };
};

const authServices = {
  googleAuthWithCode,
  refreshAccessToken,
  logoutUser,
  generateErrorCode,
  getDataFromErrorCode,
  generateAuthCode,
  getDataFromAuthCode,
};

export default authServices;
