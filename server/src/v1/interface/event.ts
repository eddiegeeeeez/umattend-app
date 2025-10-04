export interface AddEventInterface {
  id: string;
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
