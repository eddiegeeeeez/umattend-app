import express from 'express';
import eventController from '../controllers/event.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';
import { checkSchema } from 'express-validator';
import { EventValidSchema } from '../validation/addEventValidSchema';
const router = express.Router();

router.post(
  '/',
  authMiddleware,
  checkRole('admin', 'csg'),
  checkSchema(EventValidSchema),
  eventController.addEvent
);

export default router;
