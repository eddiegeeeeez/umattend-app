import prisma from '@/configs/prisma.config';
import { AddEventInterface } from '../interface/event';

const createEvent = async (event_data: AddEventInterface) => {
  return await prisma.events.create({
    data: {
      title: event_data.title,
      description: event_data.description,
      department: event_data.department,
      location: event_data.location,
      capacity: event_data?.capacity,
      all_day: event_data.all_day,
      start_time: event_data.start_time,
      end_time: event_data.end_time,
      check_out_required: event_data.check_out_required,
      is_done: event_data.is_done,
      form_fields: event_data.form_fields,
      created_by: event_data.created_by,
    },
  });
};

const eventRepository = {
  createEvent,
};

export default eventRepository;
