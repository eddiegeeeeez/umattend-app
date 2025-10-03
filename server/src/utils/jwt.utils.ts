import jwt from 'jsonwebtoken';
import prisma from '../configs/prisma.config';
import { hashRefreshToken } from '../utils/tokenHashing';
import { v4 as uuidv4 } from 'uuid';
import { AccessTokenPayloadTypes } from '../v1/types/token';
import { GenerateTokenError } from '../utils/customErrors';
import { UAParser } from 'ua-parser-js';

export const generateAccessToken = (
  tokenPayload: AccessTokenPayloadTypes
): string => {
  const SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

  if (!SECRET) {
    throw new GenerateTokenError('JWT Access Token Secret is not defined.');
  }

  const {
    user_id,
    umindanao_email,
    role,
    student_id,
    name,
    department,
    program,
    done_onboarding,
  } = tokenPayload;

  const requiredFields = [
    {
      user_id,
      umindanao_email,
      role,
      student_id,
      name,
      department,
      program,
      done_onboarding,
    },
  ];

  if (requiredFields.some((field) => !field)) {
    throw new GenerateTokenError('Missing required token payload fields');
  }

  return jwt.sign(tokenPayload, SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = async (
  user_id: string,
  ip: string,
  user_agent: string
) => {
  const SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;

  if (!SECRET) {
    throw new GenerateTokenError('JWT refresh secret not defined');
  }

  const token_id = uuidv4();

  const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const token = jwt.sign({ token_id, user_id }, SECRET, {
    expiresIn: '7d',
  });

  const hashedToken = await hashRefreshToken(token);

  const parser = new UAParser(user_agent);
  const result = parser.getResult();

  const device = result.device.model ?? result.device.type ?? 'Unknown';
  const os = result.os.name ?? 'Unknown';
  const browser = result.browser.name ?? 'Unknown';

  await prisma.refresh_token.create({
    data: {
      id: token_id,
      user_id,
      token_hash: hashedToken,
      ip_address: ip,
      device,
      os,
      browser,
      expires_at,
      last_used: new Date(),
    },
  });

  return token;
};
