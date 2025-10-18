/**
 * Event management-related types and interfaces
 */

/**
 * Attendance record for event management table
 */
export type AttendanceRecord = {
  id: string;
  name: string;
  department: string;
  program: string;
  email: string;
  checkInAt: string;
  checkInBy: string;
  checkOutAt: string;
  checkOutBy: string;
};
