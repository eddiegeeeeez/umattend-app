export interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  department: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  capacity: number | 'unlimited';
  attendees: number;
  status: EventStatus;
  checkOutRequired: boolean;
}

export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
