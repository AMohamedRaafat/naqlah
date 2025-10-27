/**
 * Utility functions for formatting data
 */

/**
 * Format date based on locale
 */
export const formatDate = (date: Date | string, locale: string = 'ar'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
};

/**
 * Format number based on locale
 */
export const formatNumber = (num: number, locale: string = 'ar'): string => {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US').format(num);
};

/**
 * Format currency based on locale
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'SAR',
  locale: string = 'ar'
): string => {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Truncate text to a specific length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

