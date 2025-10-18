/**
 * Event-related types and interfaces
 */

/**
 * Core event card data structure used across event listing components
 */
export interface EventCardData {
  id?: number;
  title: string;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  location?: string | null;
  hasLocation?: boolean;
  attendees?: number;
  image?: string | import('next/image').StaticImageData;
  description?: string;
  category?: string;
  can_edit: boolean;
  check_out_required?: boolean;
  checkin_count?: number;
  checkout_count?: number;
}

/**
 * Event status representing the current state of an event
 */
export type EventStatus = 'upcoming' | 'ongoing' | 'completed';

/**
 * Attendance status for user's participation in an event
 */
export type AttendanceStatus = 'attended' | 'partially_attended' | 'did_not_attend';

/**
 * Extended event card data with additional metadata
 */
export interface ExtendedEventCardData extends EventCardData {
  apiId: string;
  eventStatus: EventStatus;
}

/**
 * API event response structure (subset of fields from backend)
 */
export interface ApiEventData {
  id?: string;
  title?: string;
  description?: string;
  department?: string;
  location?: string;
  capacity?: number | null;
  all_day?: boolean;
  start_time?: string;
  end_time?: string;
  check_out_required?: boolean;
  is_done?: boolean;
  is_started?: boolean;
  created_by?: string;
  can_edit?: boolean;
  checkin_count?: number;
  checkout_count?: number;
  user_attendance?: {
    check_in_at?: string | null;
    check_out_at?: string | null;
  };
}
