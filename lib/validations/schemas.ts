/**
 * Zod Validation Schemas
 * Centralized validation for all forms in the application
 */

import { z } from 'zod';

// ============================================================================
// COMMON FIELD SCHEMAS
// ============================================================================

/**
 * Saudi Phone Number Schema
 * Format: 9 digits starting with 5
 * Example: 591002006
 */
export const saudiPhoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .length(9, 'Phone number must be exactly 9 digits')
  .regex(/^5[0-9]{8}$/, 'Phone number must start with 5 and contain only digits');

/**
 * Email Schema
 * Standard email validation
 */
export const emailSchema = z.string().min(1, 'Email is required').email('Invalid email address');

/**
 * Password Schema
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character');

/**
 * Non-empty String Schema
 * For required text fields
 */
export const nonEmptyStringSchema = z.string().min(1, 'This field is required').trim();

/**
 * URL Schema
 * Validates proper URL format
 */
export const urlSchema = z.string().url('Invalid URL format').optional().or(z.literal(''));

// ============================================================================
// REGISTER COMPANY SCHEMA
// ============================================================================

export const registerCompanySchema = z
  .object({
    companyName: nonEmptyStringSchema.min(2, 'Company name must be at least 2 characters'),
    city: nonEmptyStringSchema.min(1, 'Please select a city'),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    phoneNumber: saudiPhoneSchema,
    services: z.array(z.string()).min(1, 'Please select at least one service'),
    aboutCompany: nonEmptyStringSchema.min(10, 'About company must be at least 10 characters'),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Type inference for TypeScript
export type RegisterCompanyFormData = z.infer<typeof registerCompanySchema>;

// ============================================================================
// REQUEST MOVE (OTP) SCHEMA
// ============================================================================

export const requestMovePhoneSchema = z.object({
  phoneNumber: saudiPhoneSchema,
  saveData: z.boolean().optional(),
});

export type RequestMovePhoneData = z.infer<typeof requestMovePhoneSchema>;

export const requestMoveOTPSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^[0-9]{6}$/, 'OTP must contain only digits'),
});

export type RequestMoveOTPData = z.infer<typeof requestMoveOTPSchema>;

// ============================================================================
// PROFILE UPDATE SCHEMA
// ============================================================================

export const profileUpdateSchema = z.object({
  name: nonEmptyStringSchema.min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  phoneNumber: saudiPhoneSchema,
  address: nonEmptyStringSchema.optional(),
  city: nonEmptyStringSchema.optional(),
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;

// ============================================================================
// CONTACT FORM SCHEMA
// ============================================================================

export const contactFormSchema = z.object({
  name: nonEmptyStringSchema.min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  phoneNumber: saudiPhoneSchema,
  subject: nonEmptyStringSchema.min(3, 'Subject must be at least 3 characters'),
  message: nonEmptyStringSchema.min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Format Zod errors into a simple object
 * @param error - Zod validation error
 * @returns Object with field names as keys and error messages as values
 */
export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};

  error.errors.forEach((err) => {
    const path = err.path.join('.');
    if (!errors[path]) {
      errors[path] = err.message;
    }
  });

  return errors;
}

/**
 * Validate a single field
 * @param schema - Zod schema for the field
 * @param value - Value to validate
 * @returns Error message or null if valid
 */
export function validateField(schema: z.ZodType<any>, value: any): string | null {
  try {
    schema.parse(value);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || 'Invalid value';
    }
    return 'Validation error';
  }
}

/**
 * Safe parse with formatted errors
 * @param schema - Zod schema
 * @param data - Data to validate
 * @returns Object with success flag and data or errors
 */
export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
} {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  return {
    success: false,
    errors: formatZodErrors(result.error),
  };
}
