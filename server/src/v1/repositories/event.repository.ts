import prisma from '../../configs/prisma.config';

const eventRespository = {};

const deleteEvent = async (eventId: string) => {
  return await prisma.events.delete({
    where: { id: eventId },
  });
}

const eventRepository = {
  createEvent,
  deleteEvent,
};

export default eventRepository;
