/**
 * Format a date string to a full readable format
 * @param date - Date string to format
 * @returns Formatted date string (e.g., "January 15, 2024")
 */
export const formatDate = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format a date string to a short format
 * @param date - Date string to format
 * @returns Short formatted date string (e.g., "Jan 15")
 */
export const formatShortDate = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format a date string to a compact format
 * @param date - Date string to format
 * @returns Compact formatted date string (e.g., "01/15/24")
 */
export const formatCompactDate = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });
};

/**
 * Check if two dates are the same day
 * @param date1 - First date string
 * @param date2 - Second date string
 * @returns True if dates are the same day
 */
export const isSameDay = (date1: string, date2: string): boolean => {
  const d1 = new Date(date1).toLocaleDateString();
  const d2 = new Date(date2).toLocaleDateString();
  return d1 === d2;
};

/**
 * Get the current year
 * @returns Current year as number
 */
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

/**
 * Check if a date is in the current year
 * @param date - Date string to check
 * @returns True if date is in current year
 */
export const isInCurrentYear = (date: string): boolean => {
  const dateYear = new Date(date).getFullYear();
  return dateYear === getCurrentYear();
};
