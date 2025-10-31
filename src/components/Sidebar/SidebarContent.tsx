import React from 'react';

import { cn } from '@/utils/classnames';

export interface Props {
  /**
   * Content children
   */
  children: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
}

export const SidebarContent = ({ children, className }: Props) => {
  return (
    <nav
      className={cn('flex-1 overflow-y-auto p-4', className)}
      aria-label="Sidebar navigation">
      {children}
    </nav>
  );
};
