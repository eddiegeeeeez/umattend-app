import getEnv from '@/utils/envHandler';

const REDIS_HOST = getEnv('REDIS_HOST');
const REDIS_PORT = parseInt(getEnv('REDIS_PORT'));
const REDIS_USERNAME = getEnv('REDIS_USERNAME');
const REDIS_PASSWORD = getEnv('REDIS_PASSWORD');

export { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD };
