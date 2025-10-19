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
import {
  NotFoundError,
  ForbiddenError,
  NoCheckoutRequiredError,
} from '@/utils/customErrors';
import { events } from '@prisma/client';
import { endEventStatusQueue } from '../queues/endEvent.queue';
import authRepository from '../repositories/auth.repository';
import { startEventStatusQueue } from '../queues/startEvent.queue';
import { GetStudentsByEventIdInterface } from '../interface/student';
import studentRepository from '../repositories/student.repository';

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
      NODE_ENV === 'DEVELOPMENT'
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

  const hasCheckedIn = await eventRepository.getEventCheckinCount(event.id);

  if (hasCheckedIn > 0) {
    throw new ForbiddenError(
      'Cannot delete event with existing check-ins. Please contact support.'
    );
  }
  let hasCheckedOut = 0;

  if (event.check_out_required) {
    hasCheckedOut = await eventRepository.getEventCheckoutCount(event.id);
    if (hasCheckedOut > 0) {
      throw new ForbiddenError(
        'Cannot delete event with existing check-outs. Please contact support.'
      );
    }
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
      NODE_ENV === 'DEVELOPMENT'
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

    const event = await eventRepository.getEventDetails(
      attendance_data.event_id
    );
    if (!event) {
      throw new NotFoundError('Event not found');
    }

    if (event.check_out_required === false) {
      throw new NoCheckoutRequiredError();
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
      NODE_ENV === 'DEVELOPMENT'
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

const addOrganizer = async (
  umindanao_email: string,
  event_id: string,
  added_by: string
) => {
  const user = await authRepository.findUserByEmail(umindanao_email);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const user_id = user.id;

  if (!user_id) {
    throw new NotFoundError('User ID not found');
  }

  return await eventRepository.addOrganizer(user_id, added_by, event_id);
};

const removeOrganizer = async (umindanao_email: string, event_id: string) => {
  const user = await authRepository.findUserByEmail(umindanao_email);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const user_id = user.id;

  if (!user_id) {
    throw new NotFoundError('User ID not found');
  }

  // Check if user is the event creator
  const event = await eventRepository.getEventDetails(event_id);
  if (event?.created_by === user_id) {
    throw new ForbiddenError('Cannot remove the event creator as an organizer');
  }

  return await eventRepository.removeOrganizer(user_id, event_id);
};

const getOrganizersByEventId = async (event_id: string) => {
  // Check if event exists
  const event = await eventRepository.getEventDetails(event_id);
  if (!event) {
    throw new NotFoundError('Event not found');
  }

  const organizers = await eventRepository.getOrganizersByEventId(event_id);

  if (!organizers || organizers.length === 0) {
    throw new NotFoundError('No organizers found for this event');
  }

  return organizers;
};

const getEventDetailsById = async (
  event_id: string,
  user_id: string
): Promise<GetEventDetailsWithEditByIdInterface> => {
  const event = await eventRepository.getEventDetails(event_id);

  if (!event) {
    throw new NotFoundError('Event not found');
  }

  const checkin_count = await eventRepository.getEventCheckinCount(event_id);
  let checkout_count = 0;
  if (event.check_out_required) {
    checkout_count = await eventRepository.getEventCheckoutCount(event_id);
  }

  const attendanceData = await eventRepository.checkIfUserAttended(
    event_id,
    user_id
  );
  const check_in_at = attendanceData?.check_in_at ?? null;
  const check_out_at =
    attendanceData?.check_out_at instanceof Date
      ? attendanceData.check_out_at
      : null;

  const is_organizer = await eventRepository.checkOrganizer(user_id, event_id);

  return {
    ...event,
    capacity: event.capacity ?? undefined,
    start_time: event.start_time ?? undefined,
    end_time: event.end_time ?? undefined,
    can_edit: !!is_organizer,
    checkin_count: checkin_count ?? 0,
    checkout_count,
    user_attendance: {
      check_in_at: check_in_at ?? null,
      check_out_at: check_out_at ?? null,
    },
  };
};

const getAllEvents = async (
  user_id: string
): Promise<GetAllEventsInterface> => {
  const events = await eventRepository.getAllEvents();

  if (events.length === 0) {
    throw new NotFoundError('No events found');
  }

  return Promise.all(
    events.map(async (event) => {
      const is_organizer = await eventRepository.checkOrganizer(
        user_id,
        event.id
      );

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
        is_started: event.is_started,
        created_by: event.created_by,
        checkin_count: event.checkin_count ?? 0,
        checkout_count: event.checkout_count ?? 0,
        can_edit: !!is_organizer,
      };
    })
  );
};

const getAllPastEvents = async (
  user_id: string
): Promise<GetAllEventsInterface> => {
  const events = await eventRepository.getAllPastEvents();

  if (events.length === 0) {
    throw new NotFoundError('No past events found');
  }

  return Promise.all(
    events.map(async (event) => {
      const is_organizer = await eventRepository.checkOrganizer(
        user_id,
        event.id
      );

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
        checkin_count: event.checkin_count ?? 0,
        checkout_count: event.checkout_count ?? 0,
        can_edit: !!is_organizer,
      };
    })
  );
};

const getPaginatedAttendeesByEventId = async (
  event_id: string,
  page: number,
  limit: number,
  search?: string
): Promise<{
  data: GetStudentsByEventIdInterface[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}> => {
  const { attendees, total } =
    await eventRepository.getPaginatedAttendeesByEventId(
      event_id,
      page,
      limit,
      search
    );

  if (attendees.length === 0) {
    throw new NotFoundError('No attendees found for this event');
  }

  const result = await Promise.all(
    attendees.map(async (attendee) => {
      const checkInBy = attendee.check_in_by_user?.id
        ? await studentRepository.getStudentByUserId(
            attendee.check_in_by_user.id
          )
        : null;

      const checkOutBy = attendee.check_out_by_user?.id
        ? await studentRepository.getStudentByUserId(
            attendee.check_out_by_user.id
          )
        : null;

      return {
        student: {
          id: attendee.student.id,
          user_id: attendee.student.user_id,
          student_id: attendee.student.student_id,
          name: attendee.student.name,
          umindanao_email: attendee.user?.umindanao_email,
          department: attendee.student.department,
          program: attendee.student.program,
          profile_picture: attendee.student.profile_picture,
          created_at: attendee.student.created_at,
          updated_at: attendee.student.updated_at,
          check_in_at: attendee.check_in_at,
          check_out_at: attendee.check_out_at,
          check_in_by: checkInBy?.name ?? null,
          check_out_by: checkOutBy?.name ?? null,
        },
      };
    })
  );

  return {
    data: result,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getAttendeesByEventId = async (
  event_id: string
): Promise<GetStudentsByEventIdInterface[]> => {
  const attendees = await eventRepository.getAttendeesByEventId(event_id);
  if (attendees.length === 0) {
    throw new NotFoundError('No attendees found for this event');
  }
  return Promise.all(
    attendees.map(async (attendee) => {
      const checkInBy = attendee.check_in_by_user?.id
        ? await studentRepository.getStudentByUserId(
            attendee.check_in_by_user.id
          )
        : null;
      const checkOutBy = attendee.check_out_by_user?.id
        ? await studentRepository.getStudentByUserId(
            attendee.check_out_by_user.id
          )
        : null;
      return {
        student: {
          id: attendee.student.id,
          user_id: attendee.student.user_id,
          student_id: attendee.student.student_id,
          name: attendee.student.name,
          umindanao_email: attendee.user?.umindanao_email,
          department: attendee.student.department,
          program: attendee.student.program,
          profile_picture: attendee.student.profile_picture,
          created_at: attendee.student.created_at,
          updated_at: attendee.student.updated_at,
          check_in_at: attendee.check_in_at,
          check_out_at: attendee.check_out_at,
          check_in_by: checkInBy?.name ?? null,
          check_out_by: checkOutBy?.name ?? null,
        },
      };
    })
  );
};

const getEventNameById = async (event_id: string): Promise<string> => {
  const eventData = await eventRepository.getEventDetails(event_id);

  if (!eventData) {
    throw new NotFoundError('No event found with this ID');
  }

  return eventData.title;
};

const eventServices = {
  addEvent,
  deleteEvent,
  updateEvent,
  getAllEvents,
  createCheckInEvent,
  createCheckOutEvent,
  addOrganizer,
  removeOrganizer,
  getOrganizersByEventId,
  getEventDetailsById,
  getAllPastEvents,
  getAttendeesByEventId,
  getEventNameById,
  getPaginatedAttendeesByEventId,
};

export default eventServices;
