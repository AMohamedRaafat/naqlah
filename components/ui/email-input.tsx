'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  isRTL?: boolean;
  className?: string;
  id?: string;
}

/**
 * Email Input Component
 * Reusable email input with validation styling and error handling
 */
export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  (
    {
      value,
      onChange,
      onBlur,
      error,
      placeholder = 'example@email.com',
      disabled = false,
      required = false,
      isRTL = false,
      className,
      id,
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className={cn('w-full', className)}>
        <div
          className={cn(
            'flex items-center border rounded-lg overflow-hidden focus-within:ring-2 transition-colors',
            error
              ? 'border-red-500 focus-within:ring-red-500 focus-within:border-red-500'
              : 'border-[#EDEDED] focus-within:ring-[#00B8A9] focus-within:border-[#00B8A9]',
            disabled && 'opacity-50 cursor-not-allowed bg-gray-50'
          )}
        >
          <input
            ref={ref}
            type="email"
            id={id}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={cn(
              'flex-1 px-4 py-3 outline-none bg-transparent text-[14px]',
              isRTL ? 'text-right' : 'text-left',
              disabled && 'cursor-not-allowed'
            )}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    );
  }
);

EmailInput.displayName = 'EmailInput';

