/**
 * String utility functions
 */

/**
 * Convert string to title case
 * Example: "hello world" -> "Hello World"
 */
export const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Get initials from a name
 * Example: "John Doe" -> "JD", "John" -> "JO"
 */
export const getInitials = (name: string): string => {
  const names = name.split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};
