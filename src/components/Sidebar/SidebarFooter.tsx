import React from 'react';

import { cn } from '@/utils/classnames';

export interface Props {
  /**
   * Footer children
   */
  children: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
}

export const SidebarFooter = ({ children, className }: Props) => {
  return (
    <footer
      className={cn(
        'p-4 border-t border-gray-200 shrink-0 bg-gray-50',
        className
      )}>
      {children}
    </footer>
  );
};
