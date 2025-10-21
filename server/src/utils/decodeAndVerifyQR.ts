export const decodeAndVerifyQR = (qrCode: string) => {
  const decoded = Buffer.from(qrCode, 'base64').toString('utf-8');
  const time = decoded.slice(0, 8);
  const studentId = decoded.slice(8);

  const month = time.slice(0, 2);
  const date = time.slice(2, 4);
  const year = time.slice(4, 6);
  const hour = time.slice(6, 8);

  const now = new Date();
  const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
  const currentDate = String(now.getDate()).padStart(2, '0');
  const currentYear = String(now.getFullYear()).slice(-2);
  const currentHour = String(now.getHours()).padStart(2, '0');

  const dateMatches =
    month === currentMonth && date === currentDate && year === currentYear;
  const hourMatches = hour === currentHour;
  const valid = dateMatches && hourMatches;

  return {
    valid,
    student_id: valid ? studentId : null,
  };
};
