import express from 'express';
import authController from '../controllers/auth.controller';
import { oauthRateLimiter } from '../middlewares/rateLimiter.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/google', authController.googleAuth);
router.get('/google/callback', oauthRateLimiter, authController.googleCallback);
router.post('/refresh', authMiddleware, authController.refreshAccessToken);
router.get('/logout', authMiddleware, authController.logoutUser);
router.post('/exchange', oauthRateLimiter, authController.exhangeCode);

export default router;
