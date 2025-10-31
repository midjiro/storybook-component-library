import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/utils/classnames';

import { useSubMenuContext } from './hooks/useSubMenuContext';
import { SidebarSubMenu } from './SidebarSubMenu';

export interface Props {
  /**
   * Item label
   */
  label: string;
  /**
   * Item children (nested submenus)
   */
  children?: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Unique identifier for this item
   */
  id: string;
}

export const SidebarSubMenuItem = ({
  label,
  children,
  className,
  onClick,
  id,
}: Props) => {
  const { expandedId, setExpandedId } = useSubMenuContext();
  const hasChildren = !!children;
  const isExpanded = expandedId === id;

  const handleToggle = () => {
    setExpandedId(isExpanded ? null : id);
  };

  return (
    <>
      <li>
        <button
          onClick={hasChildren ? handleToggle : onClick}
          className={cn(
            'w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors text-left',
            'text-gray-700 hover:bg-gray-100',
            className
          )}>
          <span>{label}</span>
          {hasChildren && (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}>
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          )}
        </button>
      </li>

      {/* Nested submenu */}
      {hasChildren && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}>
              <SidebarSubMenu>{children}</SidebarSubMenu>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};
