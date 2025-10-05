import { Request, Response } from 'express';
import {
  HTTPErrorResponse,
  HTTPSuccessResponse,
} from '@/utils/responseHandler';
import { AddEventRequest } from '../interface/event';
import { sendEmail } from '../services/email.service';
import { matchedData, validationResult } from 'express-validator';
import eventServices from '../services/event.service';
import { NotFoundError, ForbiddenError } from '@/utils/customErrors';

const addEvent = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return HTTPErrorResponse(res, 400, errors.array());
    }

    const data = matchedData(req);

    const { id: created_by, umindanao_email } = req.user;

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
      created_by,
    };

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

const deleteEvent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { eventId } = req.params;
    const created_by = req.user?.id;

    if (!eventId) {
      return HTTPErrorResponse(res, 400, 'Event ID is required');
    }

    await eventServices.deleteEvent(eventId, created_by);

    return HTTPSuccessResponse(res, 200, 'Event successfully deleted');
  } catch (error) {
    if (error instanceof NotFoundError) {
      return HTTPErrorResponse(res, 404, error.message);
    }

    if (error instanceof ForbiddenError) {
      return HTTPErrorResponse(res, 403, error.message);
    }

    console.error('Unexpected error deleting event:', error);
    return HTTPErrorResponse(res, 500, 'Internal server error');
  }
};

const updateEvent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return HTTPErrorResponse(res, 400, errors.array());
    }

    const data = matchedData(req);

    const { id: created_by } = req.user;

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

    const updated_event_data = {
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
      created_by,
    };

    const { eventId } = req.params;

    if (!eventId) {
      return HTTPErrorResponse(res, 400, 'Event ID is required');
    }

    await eventServices.updateEvent(eventId, updated_event_data);

    return HTTPSuccessResponse(res, 200, 'Event successfully updated');
  } catch (error) {
    if (error instanceof NotFoundError) {
      return HTTPErrorResponse(res, 404, error.message);
    }

    if (error instanceof ForbiddenError) {
      return HTTPErrorResponse(res, 403, error.message);
    }

    console.error('Unexpected error updating event:', error);
    return HTTPErrorResponse(res, 500, 'Internal server error');
  }
};

const createCheckInEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user_id = req.params.user_id;

    const { umindanao_email, done_onboarding } = req.user;

    if (!done_onboarding) {
      throw new ForbiddenError('User has not completed onboarding');
    }

    const { student_id, event_id } = req.body;

    if (!student_id || !event_id) {
      return HTTPErrorResponse(
        res,
        400,
        'student_id and event_id are required'
      );
    }

    const check_in_data = {
      student_id: student_id,
      event_id: event_id,
      check_in_by: req.user.id,
      check_in_at: new Date().toISOString(),
    };

    if (!check_in_data) {
      return HTTPErrorResponse(
        res,
        400,
        'Missing check_in_data in request body'
      );
    }

    const checkIn = await eventServices.createCheckInEvent(
      user_id,
      check_in_data
    );

    if (!umindanao_email) {
      return HTTPErrorResponse(res, 401, 'Unauthorized');
    }

    if (!checkIn) {
      return HTTPErrorResponse(res, 400, 'Failed to create check-in');
    }

    const responseData = {
      event_id: checkIn.event_id,
      event_name: checkIn.event.title,
      checked_in_at: checkIn.check_in_at,
      checked_in_by: checkIn.check_in_by,
    };

    sendEmail(umindanao_email, 'Check-in Successful');

    return HTTPSuccessResponse(res, 200, 'Check-in successful', responseData);
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      return HTTPErrorResponse(res, 404, error.message);
    }
    if (error instanceof ForbiddenError) {
      return HTTPErrorResponse(res, 403, error.message);
    }
    if (error instanceof Error) {
      return HTTPErrorResponse(res, 500, error.message);
    }
    console.error('Unexpected error checking in', error);
    return HTTPErrorResponse(res, 500, 'Internal server error');
  }
};

const eventController = {
  addEvent,
  deleteEvent,
  updateEvent,
  createCheckInEvent,
};

export default eventController;
