import { useState, createContext, useContext } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';

import { cn } from '@/utils/classnames';

// Context for sidebar state
interface SidebarContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar components must be used within Sidebar');
  }
  return context;
};

// SubMenu Context for nested items
interface SubMenuContextType {
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
}

const SubMenuContext = createContext<SubMenuContextType | undefined>(undefined);

const useSubMenuContext = () => {
  const context = useContext(SubMenuContext);
  if (!context) {
    throw new Error('SubMenuItem must be used within SubMenu');
  }
  return context;
};

// Main Sidebar Component
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

// Sidebar Header Component
export interface SidebarHeaderProps {
  /**
   * Header children
   */
  children: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
}

export const SidebarHeader = ({ children, className }: SidebarHeaderProps) => {
  const { setOpen } = useSidebarContext();

  return (
    <header
      className={cn(
        'flex items-center justify-between p-4 border-b border-gray-200 shrink-0',
        className
      )}>
      {children}
      <button
        onClick={() => setOpen(false)}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Close sidebar">
        <X className="h-5 w-5 text-gray-600" />
      </button>
    </header>
  );
};

// Sidebar Footer Component
export interface SidebarFooterProps {
  /**
   * Footer children
   */
  children: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
}

export const SidebarFooter = ({ children, className }: SidebarFooterProps) => {
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

// Sidebar Content Component
export interface SidebarContentProps {
  /**
   * Content children
   */
  children: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
}

export const SidebarContent = ({
  children,
  className,
}: SidebarContentProps) => {
  return (
    <nav
      className={cn('flex-1 overflow-y-auto p-4', className)}
      aria-label="Sidebar navigation">
      {children}
    </nav>
  );
};

// Sidebar Menu Component
export interface SidebarMenuProps {
  /**
   * Menu children
   */
  children: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
}

export const SidebarMenu = ({ children, className }: SidebarMenuProps) => {
  return <ul className={cn('space-y-1', className)}>{children}</ul>;
};

// Sidebar Menu Item Component
export interface SidebarMenuItemProps {
  /**
   * Item children
   */
  children: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Whether the item is active
   */
  active?: boolean;
}

export const SidebarMenuItem = ({
  children,
  className,
  onClick,
  active,
}: SidebarMenuItemProps) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={cn(
          'w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors text-left',
          active
            ? 'bg-blue-50 text-blue-600 font-medium'
            : 'text-gray-700 hover:bg-gray-100',
          className
        )}>
        {children}
      </button>
    </li>
  );
};

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

// Sidebar SubMenuItem Component
export interface SidebarSubMenuItemProps {
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
}: SidebarSubMenuItemProps) => {
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

// Compound component exports
Sidebar.Header = SidebarHeader;
Sidebar.Footer = SidebarFooter;
Sidebar.Content = SidebarContent;
Sidebar.Menu = SidebarMenu;
Sidebar.MenuItem = SidebarMenuItem;
Sidebar.SubMenu = SidebarSubMenu;
Sidebar.SubMenuItem = SidebarSubMenuItem;
