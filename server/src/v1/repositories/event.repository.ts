import { NotFoundError } from '@/utils/customErrors';
import prisma from '../../configs/prisma.config';
import {
  AddEventInterface,
  AddCheckInInterface,
  AddCheckOutInterface,
} from '../interface/event';

const createEvent = async (event_data: AddEventInterface) => {
  return await prisma.$transaction(async (tx) => {
    const event = await tx.events.create({
      data: {
        ...event_data,
      },
    });

    await tx.organizers.create({
      data: {
        user_id: event.created_by,
        event_id: event.id,
      },
    });

    return event;
  });
};

const deleteEvent = async (eventId: string) => {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.events.findUnique({
      where: { id: eventId },
    });

    if (!existing) {
      throw new Error('Event not found or already deleted.');
    }

    if (existing.is_done) {
      throw new Error('Cannot delete a completed event.');
    }

    return tx.events.delete({
      where: { id: eventId },
    });
  });
};

const updateEvent = async (eventId: string, event_data: AddEventInterface) => {
  return await prisma.events.update({
    where: { id: eventId },
    data: {
      ...event_data,
    },
  });
};

const getEventDetails = async (eventId: string) => {
  return await prisma.events.findUnique({
    where: { id: eventId },
  });
};

const createCheckInEvent = async (
  userId: string,
  attendance_data: AddCheckInInterface
) => {
  const { event_id, student_id, check_in_at, check_in_by } = attendance_data;
  return await prisma.$transaction(async (tx) => {
    const event = await tx.events.findUnique({
      where: { id: event_id },
    });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    if (event.is_done) {
      throw new Error('Event has already ended');
    }

    const student = await tx.student.findUnique({
      where: { id: student_id },
    });

    if (!student) {
      throw new NotFoundError('Student not found');
    }

    const existingCheckIn = await tx.attendance.findFirst({
      where: {
        event_id,
        student_id,
      },
    });

    if (existingCheckIn) {
      throw new Error('Student already checked in for this event');
    }

    return await tx.attendance.create({
      data: {
        event_id,
        student_id,
        check_in_by,
        check_in_at: check_in_at ?? new Date().toISOString(),
        userId,
      },
      include: {
        event: true,
        student: true,
        check_in_by_user: true,
      },
    });
  });
};

const createCheckOutEvent = async (attendance_data: AddCheckOutInterface) => {
  const { event_id, student_id, check_out_at, check_out_by } = attendance_data;
  return await prisma.$transaction(async (tx) => {
    const event = await tx.events.findUnique({
      where: { id: event_id },
    });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    if (event.is_done) {
      throw new Error('Event has already ended');
    }

    const student = await tx.student.findUnique({
      where: { id: student_id },
    });

    if (!student) {
      throw new NotFoundError('Student not found');
    }

    const existingCheckIn = await tx.attendance.findFirst({
      where: {
        event_id,
        student_id,
      },
    });

    if (!existingCheckIn) {
      throw new Error('Student has not checked in for this event');
    }

    if (existingCheckIn.check_out_at) {
      throw new Error('Student has already checked out for this event');
    }

    return await tx.attendance.update({
      where: {
        id: existingCheckIn.id,
      },
      data: {
        check_out_at: check_out_at ?? new Date().toISOString(),
        check_out_by,
      },
      include: {
        event: true,
        student: true,
        check_in_by_user: true,
        check_out_by_user: true,
      },
    });
  });
};

const checkOrganizer = async (user_id: string, event_id: string) => {
  const organizer = await prisma.organizers.findUnique({
    where: {
      user_id_event_id: {
        user_id,
        event_id,
      },
    },
  });

  return !!organizer;
};

const addOrganizer = async (user_id: string, event_id: string) => {
  return await prisma.organizers.create({
    data: {
      user_id,
      event_id,
    },
  });
};

const eventRepository = {
  createEvent,
  deleteEvent,
  updateEvent,
  getEventDetails,
  createCheckInEvent,
  createCheckOutEvent,
  addOrganizer,
  checkOrganizer,
};

export default eventRepository;
