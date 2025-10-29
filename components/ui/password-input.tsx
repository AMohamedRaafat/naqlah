'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
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
  showToggle?: boolean; // Show/hide password toggle button
}

/**
 * Password Input Component
 * Reusable password input with show/hide toggle and error handling
 */
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      value,
      onChange,
      onBlur,
      error,
      placeholder = '••••••••',
      disabled = false,
      required = false,
      isRTL = false,
      className,
      id,
      showToggle = true,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
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
            type={showPassword ? 'text' : 'password'}
            id={id}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={cn(
              'flex-1 px-4 py-3 outline-none bg-transparent text-[14px] placeholder:text-[#7E7E7E]',
              isRTL ? 'text-right' : 'text-left',
              disabled && 'cursor-not-allowed'
            )}
            dir={isRTL ? 'rtl' : 'ltr'}
          />

          {/* Show/Hide Password Toggle */}
          {showToggle && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              disabled={disabled}
              className={cn(
                'px-3 text-gray-500 hover:text-gray-700 transition-colors',
                disabled && 'cursor-not-allowed'
              )}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

