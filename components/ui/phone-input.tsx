'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface PhoneInputProps {
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
 * Saudi Phone Input Component
 * Displays a phone input with static "+966" prefix
 * Only allows 9-digit numbers starting with 5
 */
export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value,
      onChange,
      onBlur,
      error,
      placeholder = '5XX XXX XXX',
      disabled = false,
      required = false,
      isRTL = false,
      className,
      id,
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Only allow digits
      const cleaned = e.target.value.replace(/\D/g, '');
      // Limit to 9 digits
      const limited = cleaned.slice(0, 9);
      onChange(limited);
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
          // dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Phone input */}
          <input
            ref={ref}
            type="tel"
            id={id}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            maxLength={9}
            className={cn(
              'flex-1 px-4 py-3 outline-none bg-transparent text-[14px] placeholder:text-[#7E7E7E]',
              isRTL ? 'text-right' : 'text-left',
              disabled && 'cursor-not-allowed'
            )}
            dir="ltr"
            inputMode="numeric"
            pattern="[0-9]*"
          />

          {/* Static +966 prefix */}
          <span className="px-4 py-3 text-[#A3A3A3] font-regular select-none ">966+</span>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
