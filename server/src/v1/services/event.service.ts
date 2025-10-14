import eventRepository from '../repositories/event.repository';
import {
  AddCheckInInterface,
  AddCheckOutInterface,
  AddEventInterface,
} from '../interface/event';
import { Prisma } from '@prisma/client';
import { NODE_ENV } from '../../constants/app.constants';
import { NotFoundError, ForbiddenError } from '@/utils/customErrors';
import { events } from '@prisma/client';
import { eventStatusQueue } from '../queues/event.queue';
import authRepository from '../repositories/auth.repository';

const addEvent = async (event_data: AddEventInterface) => {
  try {
    const event = await eventRepository.createEvent(event_data);

    await scheduleEventStatusJob(event);

    return event;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Unique constraint failed');
      }
      if (error.code === 'P2003') {
        throw new Error('Foreign key constraint failed');
      }
    }

    if (
      error instanceof Prisma.PrismaClientValidationError &&
      NODE_ENV === 'development'
    ) {
      throw new Error('Validation failed: ' + error.message);
    }
    console.log(error);
    return false;
  }
};

const deleteEvent = async (
  eventId: string,
  created_by: string
): Promise<boolean> => {
  const event = await eventRepository.getEventDetails(eventId);

  if (!event) {
    throw new NotFoundError('Event not found');
  }

  if (event.created_by !== created_by) {
    throw new ForbiddenError('You are not authorized to delete this event');
  }

  await eventRepository.deleteEvent(eventId);
  return true;
};

const updateEvent = async (eventId: string, event_data: AddEventInterface) => {
  const event = await eventRepository.getEventDetails(eventId);

  if (!event) {
    throw new NotFoundError('Event not found');
  }
  if (event.created_by !== event_data.created_by) {
    throw new ForbiddenError('You are not authorized to update this event');
  }
  const updated_event = await eventRepository.updateEvent(eventId, event_data);

  await eventStatusQueue.remove(`event-done-${updated_event.id}`);
  await scheduleEventStatusJob(updated_event);

  return updated_event;
};

const createCheckInEvent = async (attendance_data: AddCheckInInterface) => {
  try {
    if (!attendance_data.student_id) {
      throw new NotFoundError('Student ID is required');
    }

    return eventRepository.createCheckInEvent(attendance_data);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Unique constraint failed');
      }
      if (error.code === 'P2003') {
        throw new Error('Foreign key constraint failed');
      }
    }
    if (
      error instanceof Prisma.PrismaClientValidationError &&
      NODE_ENV === 'development'
    ) {
      throw new Error('Validation failed: ' + error.message);
    }
    console.error(error);
    return false;
  }
};

const createCheckOutEvent = async (attendance_data: AddCheckOutInterface) => {
  try {
    if (!attendance_data.event_id) {
      throw new NotFoundError('Event ID is required');
    }

    return eventRepository.createCheckOutEvent(attendance_data);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Unique constraint failed');
      }
      if (error.code === 'P2003') {
        throw new Error('Foreign key constraint failed');
      }
    }
    if (
      error instanceof Prisma.PrismaClientValidationError &&
      NODE_ENV === 'development'
    ) {
      throw new Error('Validation failed: ' + error.message);
    }
    console.error(error);
    return false;
  }
};

const scheduleEventStatusJob = async (event: events) => {
  if (!event.id) {
    return;
  }

  if (!event.all_day && !event.end_time) {
    console.warn(`Event ${event.id} has no end_time, skipping schedule.`);
    return;
  }

  const delay = event.all_day
    ? 24 * 60 * 60 * 1000
    : event.end_time
      ? Math.max(0, new Date(event.end_time).getTime() - Date.now())
      : 0;

  const jobId = `event-done-${event.id}`;

  await eventStatusQueue.add(
    'mark-event-done',
    { event_id: event.id },
    { delay, jobId }
  );

  console.log(
    `Scheduled event ${event.id} to be marked done in ${delay / 1000}s`
  );
};

const addOrganizer = async (umindanao_email: string, event_id: string) => {
  const user = await authRepository.findUserByEmail(umindanao_email);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  const user_id = user.id;
  if (!user_id) {
    throw new NotFoundError('User ID not found');
  }
  return await eventRepository.addOrganizer(user_id, event_id);
};

const eventServices = {
  addEvent,
  deleteEvent,
  updateEvent,
  createCheckInEvent,
  createCheckOutEvent,
  scheduleEventStatusJob,
  addOrganizer,
};

export default eventServices;
