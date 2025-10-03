import getEnv from '@/utils/envHandler';
import { OAuth2Client } from 'google-auth-library';

const GOOGLE_CLIENT_ID = getEnv('GOOGLE_CLIENT_ID');
const GOOGLE_CLIENT_SECRET = getEnv('GOOGLE_CLIENT_SECRET');
const GOOGLE_REDIRECT_URI = getEnv('GOOGLE_REDIRECT_URI');
const GOOGLE_CLIENT = new OAuth2Client(GOOGLE_CLIENT_ID);

export {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_CLIENT,
};
