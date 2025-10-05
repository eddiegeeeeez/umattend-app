import { NotFoundError } from '@/utils/customErrors';
import prisma from '../../configs/prisma.config';
import { AddEventInterface, AddCheckInInterface } from '../interface/event';

const createEvent = async (event_data: AddEventInterface) => {
  return await prisma.events.create({
    data: {
      ...event_data,
    },
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
        check_in_at: check_in_at || new Date().toISOString(),
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

const eventRepository = {
  createEvent,
  deleteEvent,
  updateEvent,
  getEventDetails,
  createCheckInEvent,
};

export default eventRepository;
