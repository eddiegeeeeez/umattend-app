import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Re-export utilities from specialized modules
export * from './string-utils';
export * from './date-utils';
export * from './time-utils';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


