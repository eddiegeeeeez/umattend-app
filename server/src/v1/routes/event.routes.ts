import express from 'express';
import eventController from '../controllers/event.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';
import { checkSchema } from 'express-validator';
import {
  EventValidSchema,
  AddOrganizerValidSchema,
} from '../validators/addEventValidSchema';
import { checkOrganizer } from '../middlewares/checkOrganizer.middleware';
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
  `/check_in/:event_id/:student_id`,
  authMiddleware,
  checkRole('admin', 'csg'),
  checkOrganizer,
  eventController.createCheckInEvent
);
router.post(
  `/check_out/:event_id/:student_id`,
  authMiddleware,
  checkRole('admin', 'csg'),
  checkOrganizer,
  eventController.createCheckOutEvent
);

router.post(
  `/add_organizer/:event_id`,
  authMiddleware,
  checkRole('admin', 'csg'),
  checkOrganizer,
  checkSchema(AddOrganizerValidSchema),
  eventController.addOrganizer
);



export default router;
