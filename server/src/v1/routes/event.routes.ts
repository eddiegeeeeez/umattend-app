import express from 'express';
import eventController from '../controllers/event.controller';
const router = express.Router();

router.post('/addEvent', eventController.addEvent);

export default router;
