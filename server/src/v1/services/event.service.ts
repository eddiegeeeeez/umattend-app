import eventRepository from '../repositories/event.repository';
import { AddEventInterface } from '../interface/event';
import { Prisma } from '@prisma/client';
import { NODE_ENV } from '../../constants/app.constants';
import { NotFoundError, ForbiddenError } from '@/utils/customErrors';

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

const deleteEvent = async (eventId: string, created_by: string) => {
  try {
    const event = await eventRepository.getEventDetails(eventId);
    if (!event) {
      throw new NotFoundError('Event not found');
    }
    if (event.created_by !== created_by) {
      throw new ForbiddenError('You are not authorized to delete this event');
    }
    return await eventRepository.deleteEvent(eventId);
  } catch (error) {
    console.error('Delete event failed:', error);
    throw error;
  }
};

const eventServices = {
  addEvent,
  deleteEvent,
};

export default eventServices;
