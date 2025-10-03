export const sanitizeKey = (key: string) => key.replace(/[^a-zA-Z0-9:_-]/g, '');

export const extractStudentID = (email: string): string | null => {
  const match = email.match(/\.([0-9]+)@umindanao\.edu\.ph$/);
  return match ? match[1] : null;
};
