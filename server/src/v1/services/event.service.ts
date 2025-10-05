import eventRepository from '../repositories/event.repository';
import { AddCheckInInterface, AddEventInterface } from '../interface/event';
import { Prisma } from '@prisma/client';
import { NODE_ENV } from '../../constants/app.constants';
import { NotFoundError, ForbiddenError } from '@/utils/customErrors';
import userRepository from '../repositories/user.repository';

const addEvent = async (event_data: AddEventInterface) => {
  try {
    return eventRepository.createEvent(event_data);
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
  return await eventRepository.updateEvent(eventId, event_data);
};

const createCheckInEvent = async (
  userId: string,
  attendance_data: AddCheckInInterface
) => {
  try {
    const userExists = await userRepository.findUserById(userId);
    if (!userExists) {
      throw new NotFoundError('User not found');
    }
    const userOnboarded = await userRepository.isOnBoardUser(userId);
    if (!userOnboarded) {
      throw new ForbiddenError('User has not completed onboarding');
    }
    return eventRepository.createCheckInEvent(userId, attendance_data);
  } catch (error: unknown) {
    if (error instanceof ForbiddenError) {
      throw new ForbiddenError('User has not completed onboarding');
    }
    if (error instanceof NotFoundError) {
      throw new NotFoundError('User not found');
    }
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

const eventServices = {
  addEvent,
  deleteEvent,
  updateEvent,
  createCheckInEvent,
};

export default eventServices;
