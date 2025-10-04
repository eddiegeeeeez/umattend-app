import { Request, Response } from 'express';
import { AddEventInterface } from '../interface/event';
import {
  HTTPErrorResponse,
  HTTPSuccessResponse,
} from '@/utils/responseHandler';
import eventService from '../services/event.service';
import { sendEmail } from '../services/email.service';
interface AddEventRequest extends Request {
  body: {
    event_data: AddEventInterface;
  };
}

const addEvent = async (req: AddEventRequest, res: Response) => {
  try {
    const { event_data } = req.body;
    if (!event_data) {
      return HTTPErrorResponse(res, 400, 'Miising event_data in request body');
    }
    const user = await eventService.addEvent(event_data);
    console.log(user);
    if (!user) {
      return HTTPErrorResponse(res, 500, 'Failed to add event');
    }

    sendEmail(user.umindanao_email, 'Event Successfully Created');
    return HTTPSuccessResponse(res, 200, 'Event Created');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return HTTPErrorResponse(res, 500, error.message);
    }
    return HTTPErrorResponse(res, 500, error);
  }
};

const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      return HTTPErrorResponse(res, 400, 'Event ID is required') as Response;
    }
    const success = await eventService.deleteEvent(eventId);
    if (!success) {
      return HTTPErrorResponse(res, 404, 'Event not found') as Response;
    }
    return HTTPSuccessResponse(res, 200, 'Event successfully deleted') as Response;
  } catch (error: unknown) {
    if (error instanceof Error){
      return HTTPErrorResponse(res, 500, error.message) as Response;
    }
    return HTTPErrorResponse(res, 500, 'Internal server error') as Response;
  }
};

const eventController = {
  addEvent,
  deleteEvent,
};

export default eventController;
