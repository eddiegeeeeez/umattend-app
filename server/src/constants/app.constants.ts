import getEnv from '@/utils/envHandler';

const NODE_ENV = getEnv('NODE_ENV');
const PORT = parseInt(getEnv('PORT'), 10) || 3000;
const HOST = getEnv('HOST', false);
const FRONTEND_URL = getEnv('FRONTEND_URL');
const DATABASE_URL = getEnv('DATABASE_URL');
const DIRECT_URL = getEnv('DIRECT_URL');
const ALLOWED_ORIGINS = getEnv('ALLOWED_ORIGINS');

const CORS_ORIGINS = FRONTEND_URL ? FRONTEND_URL.split(',') : [];

export {
  NODE_ENV,
  PORT,
  HOST,
  FRONTEND_URL,
  CORS_ORIGINS,
  DATABASE_URL,
  DIRECT_URL,
  ALLOWED_ORIGINS
};
