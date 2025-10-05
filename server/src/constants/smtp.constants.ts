import getEnv from '@/utils/envHandler';

const MAIL_HOST = getEnv('MAIL_HOST');
const MAIL_PORT = parseInt(getEnv('MAIL_PORT', false));
const MAIL_SECURE = getEnv('MAIL_SECURE', false);
const MAIL_USER = getEnv('MAIL_USER');
const MAIL_PASS = getEnv('MAIL_PASS');

export { MAIL_HOST, MAIL_PORT, MAIL_SECURE, MAIL_USER, MAIL_PASS };
