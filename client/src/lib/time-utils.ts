export const generateTimeOptions = () => {
  const times: string[] = [];
  const periods = ['AM', 'PM'];

  periods.forEach((period) => {
    for (let hour = 12; hour <= 12; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00 ${period}`);
      times.push(`${hour.toString().padStart(2, '0')}:30 ${period}`);
    }
    for (let hour = 1; hour < 12; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00 ${period}`);
      times.push(`${hour.toString().padStart(2, '0')}:30 ${period}`);
    }
  });

  return times;
};

export const getDefaultStartTime = () => {
  const now = new Date();
  const minutes = now.getMinutes();

  // Round up to next 30-minute interval
  if (minutes === 0) {
    // Already at :00, keep it
  } else if (minutes <= 30) {
    // Round up to :30
    now.setMinutes(30);
  } else {
    // Round up to next hour :00
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
  }

  now.setSeconds(0);
  now.setMilliseconds(0);

  // Format to "HH:MM AM/PM"
  let hours = now.getHours();
  const mins = now.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${period}`;
};

export const addOneHour = (timeStr: string) => {
  const [time, period] = timeStr.split(' ');
  const [hoursStr, mins] = time.split(':');
  let hours = Number.parseInt(hoursStr);

  // Add 1 hour
  hours += 1;

  let newPeriod = period;
  // Handle 12:XX AM -> 1:XX PM and 12:XX PM -> 1:XX AM transitions
  if (hours === 12 && period === 'AM') {
    newPeriod = 'PM';
  } else if (hours === 13) {
    hours = 1;
    newPeriod = period === 'AM' ? 'PM' : 'AM';
  } else if (hours > 12) {
    hours = hours - 12;
  }

  return `${hours.toString().padStart(2, '0')}:${mins} ${newPeriod}`;
};

export const parseTimeToMinutes = (timeStr: string) => {
  const [time, period] = timeStr.split(' ');
  const [hoursStr, minutes] = time.split(':').map(Number);
  let hours = hoursStr;

  if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
  if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;

  console.log(`${timeStr} = ${hours * 60 + minutes} minutes`);
  return hours * 60 + minutes;
};
