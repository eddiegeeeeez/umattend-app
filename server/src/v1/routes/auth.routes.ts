import express from 'express';
import authController from '../controllers/auth.controller';
import { oauthRateLimiter, exchangeRateLimiter } from '../middlewares/rateLimiter.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/google', authController.googleAuth);
router.get('/google/callback', oauthRateLimiter, authController.googleCallback);
router.post('/refresh', authMiddleware, authController.refreshAccessToken);
router.post('/logout', authMiddleware, authController.logoutUser);
router.post('/exchange', exchangeRateLimiter, authController.exhangeCode);
router.get('/login-history', authMiddleware, authController.getLoginHistory);

export default router;
