import { type ClassValue, clsx } from 'clsx';

/**
 * Utility to merge Tailwind CSS classes
 * Combines clsx for conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
