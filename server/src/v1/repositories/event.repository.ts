import prisma from '../../configs/prisma.config';
import { AddEventInterface } from '../interface/event';


const createEvent = async (event_data: AddEventInterface) => {
  return await prisma.events.create({
    data: {
      ...event_data,
    },
  });
};

const deleteEvent = async (eventId: string) => {
  return await prisma.events.delete({
    where: { id: eventId },
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

const eventRepository = {
  createEvent,
  deleteEvent,
  updateEvent,
  getEventDetails,
};

export default eventRepository;
