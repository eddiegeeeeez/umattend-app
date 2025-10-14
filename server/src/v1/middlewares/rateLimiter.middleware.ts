import rateLimit from 'express-rate-limit';
import { FRONTEND_URL } from '../../constants/app.constants';
import authService from '../services/auth.service';

export const authRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    success: false,
    message: 'Too many login attempts. Please try again later.',
  },
});

export const registrationRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    success: false,
    message: 'Too many registration attempts. Please try again later.',
  },
});

export const oauthRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,

  handler: async (req, res) => {
    let errorMessage = '';

    if (req.originalUrl.includes('/exchange')) {
      errorMessage = 'Too Many Exchange Attempts. Please try again later.';
      const error_code = await authService.generateErrorCode(errorMessage);

      return res.status(429).json({
        status: 'error',
        message: errorMessage,
        error_code,
      });
    }

    if (req.originalUrl.includes('/google/callback')) {
      errorMessage = 'Too Many Login Attempts. Please try again later.';
      const error_code = await authService.generateErrorCode(errorMessage);

      return res.redirect(`${FRONTEND_URL}/?error_code=${error_code}`);
    }
  },
});

export const exchangeRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    success: false,
    message: 'Too many requests. Please try again later.',
  },
});

export default exchangeRateLimiter;
