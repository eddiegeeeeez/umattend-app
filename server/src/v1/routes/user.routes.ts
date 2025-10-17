import express from 'express';
import userController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware, userController.getUserById);
router.get('/events/:id', userController.getUserAttendedEvents);
router.post('/onboarding', authMiddleware, userController.onboardUser);
export default router;
