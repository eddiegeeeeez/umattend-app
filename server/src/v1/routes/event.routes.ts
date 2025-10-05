import express from 'express';
import eventController from '../controllers/event.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';
import { checkSchema } from 'express-validator';
import { EventValidSchema } from '../validators/addEventValidSchema';
const router = express.Router();

router.post(
  '/',
  authMiddleware,
  checkRole('admin', 'csg'),
  checkSchema(EventValidSchema),
  eventController.addEvent
);
router.delete(
  '/:eventId',
  authMiddleware,
  checkRole('admin', 'csg'),
  eventController.deleteEvent
);
router.put(
  '/:eventId',
  authMiddleware,
  checkRole('admin', 'csg'),
  checkSchema(EventValidSchema),
  eventController.updateEvent
);
router.post(
  `/check_in/:user_id`,
  authMiddleware,
  checkRole('admin', 'csg'),
  eventController.createCheckInEvent
);

export default router;
