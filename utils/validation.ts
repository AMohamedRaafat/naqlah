/**
 * Utility functions for validation
 *
 * @deprecated These functions are kept for backward compatibility.
 * For new code, please use Zod schemas from '@/lib/validations/schemas'
 *
 * Example:
 * ```typescript
 * import { saudiPhoneSchema, emailSchema } from '@/lib/validations/schemas';
 * const error = validateField(saudiPhoneSchema, phoneNumber);
 * ```
 */

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Saudi format)
 * Saudi phone numbers:
 * - Must be exactly 9 digits
 * - Must start with 5 (mobile numbers)
 * - Second digit should be 0, 1, 3, 4, 5, 6, 7, 8, or 9
 * Format: 5XXXXXXXX (9 digits total)
 */
export const isValidSaudiPhone = (phone: string): boolean => {
  // Remove any spaces or special characters
  const cleanPhone = phone.replace(/\s+/g, '').replace(/[^\d]/g, '');

  // Check if it's exactly 9 digits and starts with 5
  const phoneRegex = /^5[0-9]{8}$/;
  return phoneRegex.test(cleanPhone);
};

/**
 * Validate Saudi phone with detailed errors
 */
export const validateSaudiPhone = (
  phone: string
): {
  isValid: boolean;
  error?: string;
} => {
  const cleanPhone = phone.replace(/\s+/g, '').replace(/[^\d]/g, '');

  if (cleanPhone.length === 0) {
    return { isValid: false, error: 'Phone number is required' };
  }

  if (cleanPhone.length < 9) {
    return { isValid: false, error: 'Phone number must be 9 digits' };
  }

  if (cleanPhone.length > 9) {
    return { isValid: false, error: 'Phone number must be exactly 9 digits' };
  }

  if (!cleanPhone.startsWith('5')) {
    return { isValid: false, error: 'Phone number must start with 5' };
  }

  return { isValid: true };
};

/**
 * Validate password strength
 */
export const validatePassword = (
  password: string
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
