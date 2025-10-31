import React, { useState } from 'react';

import { cn } from '@/utils/classnames';

import { SubMenuContext } from './context/subMenuContext';

// Sidebar SubMenu Component
export interface SidebarSubMenuProps {
  /**
   * SubMenu children
   */
  children: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
}

export const SidebarSubMenu = ({
  children,
  className,
}: SidebarSubMenuProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <SubMenuContext.Provider value={{ expandedId, setExpandedId }}>
      <ul className={cn('space-y-1 mt-1', className)}>{children}</ul>
    </SubMenuContext.Provider>
  );
};
