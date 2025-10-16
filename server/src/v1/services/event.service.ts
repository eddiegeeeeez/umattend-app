import eventRepository from '../repositories/event.repository';
import {
  AddCheckInInterface,
  AddCheckOutInterface,
  AddEventInterface,
  GetAllEventsInterface,
  GetEventDetailsWithEditByIdInterface,
} from '../interface/event';
import { Prisma } from '@prisma/client';
import { NODE_ENV } from '../../constants/app.constants';
import { NotFoundError, ForbiddenError } from '@/utils/customErrors';
import { events } from '@prisma/client';
import { endEventStatusQueue } from '../queues/endEvent.queue';
import authRepository from '../repositories/auth.repository';
import { startEventStatusQueue } from '../queues/startEvent.queue';
import { GetStudentsByEventIdInterface } from '../interface/student';

const addEvent = async (event_data: AddEventInterface) => {
  try {
    const event = await eventRepository.createEvent(event_data);

    await scheduleStartEventStatusJob(event);
    await scheduleEndEventStatusJob(event);

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

  await startEventStatusQueue.remove(`event-start-${updated_event.id}`);
  await endEventStatusQueue.remove(`event-done-${updated_event.id}`);
  await scheduleStartEventStatusJob(updated_event);
  await scheduleEndEventStatusJob(updated_event);

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

const scheduleEndEventStatusJob = async (event: events) => {
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

  await endEventStatusQueue.add(
    'mark-event-done',
    { event_id: event.id },
    { delay, jobId }
  );

  console.log(
    `Scheduled event ${event.id} to be marked done in ${delay / 1000}s`
  );
};

const scheduleStartEventStatusJob = async (event: events) => {
  if (!event.id) {
    return;
  }

  if (!event.all_day && !event.start_time) {
    console.warn(`Event ${event.id} has no start_time, skipping schedule.`);
    return;
  }

  const delay = event.all_day
    ? 0 // all-day events start immediately
    : event.start_time
      ? Math.max(0, new Date(event.start_time).getTime() - Date.now())
      : 0;

  const jobId = `event-start-${event.id}`;

  await startEventStatusQueue.add(
    'mark-event-started',
    { event_id: event.id },
    { delay, jobId }
  );

  console.log(
    `Scheduled event ${event.id} to be marked started in ${delay / 1000}s`
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

const getEventDetailsById = async (
  event_id: string
): Promise<GetEventDetailsWithEditByIdInterface> => {
  let can_edit = false;

  const event = await eventRepository.getEventDetails(event_id);

  if (!event) {
    throw new NotFoundError('Event not found');
  }

  const is_organizer = await eventRepository.checkOrganizer(
    event.created_by,
    event_id
  );

  if (is_organizer) {
    can_edit = true;
  }

  return {
    id: event.id,
    title: event.title,
    description: event.description,
    department: event.department,
    location: event.location,
    capacity: event.capacity ?? undefined,
    all_day: event.all_day,
    start_time: event.start_time ?? undefined,
    end_time: event.end_time ?? undefined,
    check_out_required: event.check_out_required,
    is_done: event.is_done,
    created_by: event.created_by,
    can_edit,
  };
};

const getAllEvents = async (): Promise<GetAllEventsInterface> => {
  const events = await eventRepository.getAllEvents();

  if (events.length === 0) {
    throw new NotFoundError('No events found');
  }

  return events.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    department: event.department,
    location: event.location,
    capacity: event.capacity ?? undefined,
    all_day: event.all_day,
    start_time: event.start_time ?? undefined,
    end_time: event.end_time ?? undefined,
    check_out_required: event.check_out_required,
    is_done: event.is_done,
    created_by: event.created_by,
  }));
};

const getAllPastEvents = async (): Promise<GetAllEventsInterface> => {
  const events = await eventRepository.getAllPastEvents();

  if (events.length === 0) {
    throw new NotFoundError('No past events found');
  }

  return events.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    department: event.department,
    location: event.location,
    capacity: event.capacity ?? undefined,
    all_day: event.all_day,
    start_time: event.start_time ?? undefined,
    end_time: event.end_time ?? undefined,
    check_out_required: event.check_out_required,
    is_done: event.is_done,
    created_by: event.created_by,
  }));
};

const getAttendeesByEventId = async (
  event_id: string
): Promise<GetStudentsByEventIdInterface[]> => {
  const attendees = await eventRepository.getAttendeesByEventId(event_id);

  if (attendees.length === 0) {
    throw new NotFoundError('No attendees found for this event');
  }

  return attendees.map((attendee) => ({
    student: {
      id: attendee.student.id,
      user_id: attendee.student.user_id,
      student_id: attendee.student.student_id,
      name: attendee.student.name,
      department: attendee.student.department,
      program: attendee.student.program,
      profile_picture: attendee.student.profile_picture,
      created_at: attendee.student.created_at,
      updated_at: attendee.student.updated_at,
      check_in_at: attendee.check_in_at,
      check_out_at: attendee.check_out_at,
    },
  }));
};

const eventServices = {
  addEvent,
  deleteEvent,
  updateEvent,
  getAllEvents,
  createCheckInEvent,
  createCheckOutEvent,
  addOrganizer,
  getEventDetailsById,
  getAllPastEvents,
  getAttendeesByEventId,
};

export default eventServices;
