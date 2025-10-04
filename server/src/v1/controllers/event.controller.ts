import { Request, Response } from 'express';
import { AddEventInterface } from '../interface/event';
import {
  HTTPErrorResponse,
  HTTPSuccessResponse,
} from '@/utils/responseHandler';
import eventServices from '../services/event.service';
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
    const success = await eventServices.addEvent(event_data);
    console.log(success);
    if (!success) {
      return HTTPErrorResponse(res, 500, 'Failed to add event');
    }
    return HTTPSuccessResponse(res, 200, 'Event Created');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return HTTPErrorResponse(res, 500, error.message);
    }
    return HTTPErrorResponse(res, 500, error);
  }
};

const eventController = {
  addEvent,
};

export default eventController;
