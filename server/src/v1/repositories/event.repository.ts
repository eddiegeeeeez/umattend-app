import prisma from '../../configs/prisma.config';

const deleteEvent = async (eventId: string) => {
  return await prisma.events.delete({
    where: { id: eventId },
  });
}

const eventRespository = {deleteEvent};
export default eventRespository;
