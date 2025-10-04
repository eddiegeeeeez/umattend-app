import express from 'express';
import eventController from '../controllers/event.controller';
const router = express.Router();

router.post('/', eventController.addEvent);

export default router;
