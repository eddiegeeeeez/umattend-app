import { Request, Response } from 'express';
import {
  HTTPErrorResponse,
  HTTPSuccessResponse,
} from '@/utils/responseHandler';
import { AddEventRequest } from '../interface/event';
import { sendEmail } from '../services/email.service';
import { matchedData, validationResult } from 'express-validator';
import eventServices from '../services/event.service';

const addEvent = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return HTTPErrorResponse(res, 400, errors.array());
    }

    const data = matchedData(req);

    const { id, umindanao_email } = req.user;

    const {
      title,
      description,
      department,
      location,
      capacity,
      all_day,
      start_time,
      end_time,
      check_out_required,
      is_done,
    } = data as AddEventRequest['body']['event_data'];

    const event_data = {
      title,
      description,
      department,
      location,
      capacity,
      all_day,
      start_time,
      end_time,
      check_out_required,
      is_done,
      created_by: id,
    };

    console.log(event_data);

    if (!event_data) {
      return HTTPErrorResponse(res, 400, 'Missing event_data in request body');
    }

    if (!umindanao_email) {
      return HTTPErrorResponse(res, 401, 'Unauthorized');
    }

    await eventServices.addEvent(event_data);

    if (!umindanao_email) {
      return HTTPErrorResponse(res, 500, 'Failed to add event');
    }

    sendEmail(umindanao_email, 'Event Successfully Created');

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
    const success = await eventServices.deleteEvent(eventId);
    if (!success) {
      return HTTPErrorResponse(res, 404, 'Event not found') as Response;
    }
    return HTTPSuccessResponse(
      res,
      200,
      'Event successfully deleted'
    ) as Response;
  } catch (error: unknown) {
    if (error instanceof Error) {
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
