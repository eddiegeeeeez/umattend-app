import express from 'express';
import eventController from '../controllers/event.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { onlyAdmin } from '../middlewares/role.middleware';
import { checkSchema } from 'express-validator';
import { EventValidSchema } from '../validation/addEventValidSchema';
const router = express.Router();

router.post(
  '/',
  authMiddleware,
  onlyAdmin,
  checkSchema(EventValidSchema),
  eventController.addEvent
);

export default router;
