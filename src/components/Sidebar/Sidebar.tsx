import { motion, AnimatePresence } from 'framer-motion';

import { SidebarSubMenuItem } from './SidebarSubMenuItem';

import { SidebarSubMenu } from './SidebarSubMenu';
import { cn } from '@/utils/classnames';
import { SidebarContext } from './context/sidebarContext';
import { SidebarHeader } from './SidebarHeader';
import { SidebarFooter } from './SidebarFooter';
import { SidebarContent } from './SidebarContent';
import { SidebarMenu } from './SidebarMenu';
import { SidebarMenuItem } from './SidebarMenuItem';

export interface SidebarProps {
  /**
   * Whether the sidebar is open
   */
  open: boolean;
  /**
   * Callback when sidebar state changes
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Sidebar children
   */
  children: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Sidebar width (default: 320px)
   */
  width?: number;
}

export const Sidebar = ({
  open,
  onOpenChange,
  children,
  className,
  width = 320,
}: SidebarProps) => {
  return (
    <SidebarContext.Provider value={{ open, setOpen: onOpenChange }}>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => onOpenChange(false)}
              aria-hidden="true"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: width }}
              animate={{ x: 0 }}
              exit={{ x: width }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                'fixed top-0 right-0 h-full bg-white shadow-xl z-50 flex flex-col',
                className
              )}
              style={{ width: `${width}px` }}
              role="dialog"
              aria-modal="true">
              {children}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </SidebarContext.Provider>
  );
};

// Compound component exports
Sidebar.Header = SidebarHeader;
Sidebar.Footer = SidebarFooter;
Sidebar.Content = SidebarContent;
Sidebar.Menu = SidebarMenu;
Sidebar.MenuItem = SidebarMenuItem;
Sidebar.SubMenu = SidebarSubMenu;
Sidebar.SubMenuItem = SidebarSubMenuItem;
