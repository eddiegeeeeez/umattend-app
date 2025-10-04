import { Prisma } from '@prisma/client';
import { AddEventInterface } from '../interface/event';
import eventRepository from '../repositories/event.repository';

const addEvent = async (event_data: AddEventInterface): Promise<boolean> => {
  try {
    const event = await eventRepository.createEvent(event_data);
    console.log(event);
    return true;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Unique constraint failed');
      }
      if (error.code === 'P2003') {
        throw new Error('Foreign key constraint failed');
      }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new Error('Validation failed: ' + error.message);
    }
    console.log(error);
    return false;
  }
};

const eventServices = {
  addEvent,
};

export default eventServices;
