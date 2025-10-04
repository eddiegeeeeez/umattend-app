import express from 'express';
import eventController from '../controllers/event.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.delete('/:eventId', authMiddleware, eventController.deleteEvent);


export default router;
