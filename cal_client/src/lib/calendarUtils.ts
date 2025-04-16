// lib/calendarUtils.ts
import { format, isEqual, startOfDay } from 'date-fns';

/**
 * Format a date according to the specified format
 * @param date The date to format
 * @param formatType The type of format to use: 'full', 'short', or custom format string
 * @returns The formatted date string
 */
export const formatDate = (date: Date, formatType: 'full' | 'short' | string = 'full'): string => {
  const formatMap: Record<string, string> = {
    full: 'EEEE, MMMM d, yyyy',
    short: 'MMM d, yyyy',
  };
  
  const formatString = formatMap[formatType] || formatType;
  return format(date, formatString);
};

/**
 * Check if a date is today
 * @param date The date to check
 * @returns True if the date is today, false otherwise
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return isEqual(
    startOfDay(date),
    startOfDay(today)
  );
};

/**
 * Get month name
 * @param date The date
 * @returns The month name
 */
export const getMonthName = (date: Date): string => {
  return format(date, 'MMMM');
};

/**
 * Get day name
 * @param date The date
 * @returns The day name
 */
export const getDayName = (date: Date): string => {
  return format(date, 'EEEE');
};

/**
 * Get a color for a category
 * @param category The category name
 * @returns CSS class for the category color
 */
export const getCategoryColor = (category?: string): string => {
  const colors: Record<string, string> = {
    work: 'bg-gradient-to-r from-violet-600 to-indigo-600 border-violet-400',
    personal: 'bg-gradient-to-r from-teal-600 to-emerald-600 border-teal-400',
    important: 'bg-gradient-to-r from-rose-600 to-pink-600 border-rose-400',
    other: 'bg-gradient-to-r from-amber-600 to-orange-600 border-amber-400'
  };
  
  return colors[category || 'other'] || colors.other;
};

/**
 * Get text color for a category
 * @param category The category name
 * @returns CSS class for text color
 */
export const getCategoryTextColor = (category?: string): string => {
  const colors: Record<string, string> = {
    work: 'text-indigo-300',
    personal: 'text-emerald-300',
    important: 'text-rose-300',
    other: 'text-amber-300'
  };
  
  return colors[category || 'other'] || colors.other;
};

/**
 * Get ring/border color for a category
 * @param category The category name
 * @returns CSS class for the ring/border color
 */
export const getCategoryRingColor = (category?: string): string => {
  const colors: Record<string, string> = {
    work: 'ring-indigo-500',
    personal: 'ring-emerald-500',
    important: 'ring-rose-500',
    other: 'ring-amber-500'
  };
  
  return colors[category || 'other'] || colors.other;
};

/**
 * Format date for API requests
 * @param date Date to format
 * @returns Date formatted as YYYY-MM-DD
 */
export const formatDateForBackend = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};