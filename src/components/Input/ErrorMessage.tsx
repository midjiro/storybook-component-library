import React, { forwardRef } from 'react';

import { cn } from '@/utils/classnames';

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Error message text
   */
  children: React.ReactNode;
}

/**
 * Error message component for form inputs
 */
export const ErrorMessage = forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('mt-1.5 text-sm text-red-500', className)}
        {...props}>
        {children}
      </p>
    );
  }
);

ErrorMessage.displayName = 'ErrorMessage';
