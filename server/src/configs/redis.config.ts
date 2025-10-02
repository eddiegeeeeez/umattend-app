import Redis from 'ioredis';

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

if (!REDIS_HOST || !REDIS_PORT || !REDIS_USERNAME || !REDIS_PASSWORD) {
  throw new Error('Missing Redis configuration in environment variables');
}

const redis = new Redis({
  host: REDIS_HOST,
  username: 'default',
  port: Number(REDIS_PORT),
  password: REDIS_PASSWORD,
});

export default redis;
