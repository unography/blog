/**
 * Format date for feed/list views (e.g., "April 2019")
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

/**
 * Format date for post detail views (e.g., "April 7, 2019")
 */
export function formatDateLong(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
