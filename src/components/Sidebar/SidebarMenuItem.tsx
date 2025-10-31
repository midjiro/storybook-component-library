import { cn } from '@/utils/classnames';

export interface Props {
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
}: Props) => {
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
