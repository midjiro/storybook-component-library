import React, { forwardRef, useState } from 'react';

import { Eye, EyeOff, X } from 'lucide-react';

import { cn } from '@/utils/classnames';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Show a clear button to reset the input value
   */
  clearable?: boolean;
  /**
   * Show an error state
   */
  error?: boolean;
  /**
   * Error message to display below the input
   */
  errorMessage?: string;
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  /**
   * Input label
   */
  label?: string;
}

/**
 * Input component with password toggle and clear functionality
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      clearable = false,
      error = false,
      errorMessage,
      helperText,
      label,
      className,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState('');
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    // Handle controlled vs uncontrolled input
    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('');
      }
      // Create a synthetic event for controlled inputs
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    };

    const hasValue =
      inputValue !== '' && inputValue !== undefined && inputValue !== null;

    const showActionButtons = clearable || isPassword;

    return (
      <div className="w-full">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            value={inputValue}
            onChange={handleChange}
            className={cn(
              'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
              'ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium',
              'file:text-gray-950 placeholder:text-gray-400',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              clearable || isPassword ? 'pr-10' : '',
              error ? 'border-red-500 focus-visible:ring-red-500' : '',
              className
            )}
            {...props}
          />

          {showActionButtons && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {isPassword && hasValue && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
              {clearable && hasValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Clear input">
                  <X size={16} />
                </button>
              )}
            </div>
          )}
        </div>
        {/* Helper text or error message */}
        {error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {helperText && !error && (
          <p className={cn('mt-1.5 text-sm', 'text-gray-600')}>{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
