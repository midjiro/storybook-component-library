import { cn } from '@/utils/classnames';
import { X } from 'lucide-react';
import { useSidebarContext } from './hooks/useSidebarContext';

export interface Props {
  /**
   * Header children
   */
  children: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
}

export const SidebarHeader = ({ children, className }: Props) => {
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
