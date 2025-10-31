import React from 'react';

import { cn } from '@/utils/classnames';

// Sidebar Menu Component
export interface Props {
  /**
   * Menu children
   */
  children: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
}

export const SidebarMenu = ({ children, className }: Props) => {
  return <ul className={cn('space-y-1', className)}>{children}</ul>;
};
