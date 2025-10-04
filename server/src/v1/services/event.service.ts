import eventRespository from '../repositories/event.repository';

const deleteEvent = async (eventId: string) => {
  return await eventRespository.deleteEvent(eventId);
}

const eventService = {deleteEvent};
export default eventService;
