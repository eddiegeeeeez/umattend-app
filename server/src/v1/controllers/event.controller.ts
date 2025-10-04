import eventService from '../services/event.service';
import { HTTPErrorResponse, HTTPSuccessResponse } from '@/utils/responseHandler';
import { Request, Response } from 'express';

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

const eventController = {deleteEvent};

export default eventController;
