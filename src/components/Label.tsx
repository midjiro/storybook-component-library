import React, { forwardRef } from 'react';

import { cn } from '../utils/classnames';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Whether the label is required
   */
  required?: boolean;
}

/**
 * Label component for form inputs
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, required = false, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'block text-sm font-medium text-gray-900 mb-1.5',
          required && 'after:content-["*"] after:ml-0.5 after:text-red-500',
          className
        )}
        {...props}>
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';
