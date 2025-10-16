import { Request } from 'express';

export interface AddEventInterface {
  title: string;
  description: string;
  department: string;
  location: string;
  capacity?: number;
  all_day: boolean;
  start_time: Date;
  end_time: Date;
  check_out_required: boolean;
  is_done: boolean;
  form_fields?: {};
  created_by: string;
}

export interface UpdateEventInterface {
  title?: string;
  description?: string;
  department?: string;
  location?: string;
  capacity?: number;
  all_day?: boolean;
  start_time?: Date;
  end_time?: Date;
  check_out_required?: boolean;
  is_done?: boolean;
  form_fields?: {};
  created_by?: string;
}

export interface AddCheckInInterface {
  student_id: string;
  event_id: string;
  check_in_at: string;
  check_in_by: string;
}

export interface AddCheckOutInterface {
  student_id: string;
  event_id: string;
  check_out_at: string;
  check_out_by: string;
}

export interface AddEventRequest extends Request {
  body: {
    event_data: AddEventInterface;
  };
}

export interface GetEventDetailsByIdInterface {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  capacity?: number;
  all_day: boolean;
  start_time?: Date;
  end_time?: Date;
  check_out_required: boolean;
  is_done: boolean;
  checkin_count: number;
  checkout_count?: number;
  created_by: string;
}

export interface GetEventDetailsWithEditByIdInterface
  extends GetEventDetailsByIdInterface {
  can_edit: boolean;
}

export interface GetAllEventsInterface
  extends Array<GetEventDetailsByIdInterface> {}
