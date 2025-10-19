/**
 * Date and time formatting utilities
 */

/**
 * Format a date to a readable string
 * Example: "2025-03-15T08:00:00Z" -> "Friday, March 15, 2025"
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Format a date to short format
 * Example: new Date(2025, 2, 15) -> "Mar 15, 2025"
 */
export const formatDateShort = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

/**
 * Format a date to shortest format (no year)
 * Example: new Date(2025, 2, 15) -> "Mar 15"
 */
export const formatDateVeryShort = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

/**
 * Format day of week
 * Example: new Date() -> "Mon"
 */
export const formatDayOfWeek = (date: Date): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
};

/**
 * Format time from a Date object
 * Example: "2025-03-15T14:30:00Z" -> "2:30 PM"
 */
export const formatTime = (dateTime: Date | string): string => {
  const dateObj = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
  return dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Format time with 12-hour format and padded hours
 * Example: new Date() with 14:30 -> "02:30 PM"
 */
export const formatTimePadded = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const hoursStr = hours.toString().padStart(2, '0');
  const minutesStr = minutes.toString().padStart(2, '0');
  return `${hoursStr}:${minutesStr} ${ampm}`;
};

/**
 * Format time with timezone offset
 * Example: new Date() -> "2:30 PM GMT+8"
 */
export const formatTimeWithTimezone = (date: Date): string => {
  const timeStr = new Intl.DateTimeFormat(undefined, { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  }).format(date);
  
  const formatGmtOffset = (date: Date) => {
    const offset = -date.getTimezoneOffset();
    const hours = Math.floor(Math.abs(offset) / 60);
    return `GMT${offset >= 0 ? '+' : '-'}${hours}`;
  };
  
  return `${timeStr} ${formatGmtOffset(date)}`;
};

/**
 * Format date and time together
 * Example: "2025-03-15T14:30:00Z" -> "Mar 15, 2025, 2:30 PM"
 */
export const formatDateTime = (dateStr: string | undefined): string => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Format date and time with full details
 * Example: "2025-03-15T14:30:00Z" -> "03/15/2025, 02:30 PM"
 */
export const formatDateTimeFull = (dateStr: string | undefined): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Format an event's date range
 * Example: formatEventDate("2025-03-15T14:00:00Z", "2025-03-15T16:00:00Z") 
 *          -> "Friday, March 15, 2025, 2:00 PM - 4:00 PM"
 */
export const formatEventDateRange = (
  startTime: string | null | undefined, 
  endTime: string | null | undefined
): string => {
  if (!startTime) return 'Date TBA';
  const date = formatDate(startTime);
  const start = formatTime(startTime);
  const end = endTime ? formatTime(endTime) : '';
  return `${date}, ${start}${end ? ` - ${end}` : ''}`;
};
