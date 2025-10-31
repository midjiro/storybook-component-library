import { forwardRef, useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

import { cn } from '@/utils/classnames';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export type ToastType = 'info' | 'warning' | 'error' | 'success';

export interface ToastProps {
  /**
   * Toast message content
   */
  message: string;
  /**
   * Toast type
   */
  type?: ToastType;
  /**
   * Toast position on screen
   */
  position?: ToastPosition;
  /**
   * Duration in milliseconds before auto-dismissing (0 = no auto-dismiss)
   */
  duration?: number;
  /**
   * Whether to show a close button
   */
  closeable?: boolean;
  /**
   * Optional title
   */
  title?: string;
  /**
   * Callback when toast is closed
   */
  onClose?: () => void;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Whether the toast is currently visible
   */
  visible?: boolean;
}

const colorMap = {
  info: 'border-blue-200 bg-blue-50 text-blue-900',
  success: 'border-green-200 bg-green-50 text-green-900',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
  error: 'border-red-200 bg-red-50 text-red-900',
};

const iconColorMap = {
  info: 'text-blue-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
};

const positionMap: Record<ToastPosition, string> = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

/**
 * Toast notification component with customizable position and types
 */
export const Toast = forwardRef<HTMLElement, ToastProps>(
  (
    {
      message,
      type = 'info',
      position = 'bottom-right',
      duration = 5000,
      closeable = true,
      title,
      onClose,
      className,
      visible = true,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => {
      setIsVisible(visible);
    }, [visible]);

    const handleClose = () => {
      setIsVisible(false);
      onClose?.();
    };

    useEffect(() => {
      if (duration > 0 && isVisible) {
        const timer = setTimeout(handleClose, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, isVisible, onClose]);

    const iconMap = {
      info: <Info className="h-5 w-5" />,
      success: <CheckCircle className="h-5 w-5" />,
      warning: <AlertCircle className="h-5 w-5" />,
      error: <AlertCircle className="h-5 w-5" />,
    };

    // Animation variants based on position
    const getVariants = () => {
      const isTop = position.startsWith('top');
      const isCenter = position.endsWith('center');

      if (isCenter) {
        return {
          initial: { y: isTop ? -50 : 50, opacity: 0, scale: 0.8 },
          animate: { y: 0, opacity: 1, scale: 1 },
          exit: { y: isTop ? -50 : 50, opacity: 0, scale: 0.8 },
        };
      }

      const isRight = position.endsWith('right');
      return {
        initial: { x: isRight ? 400 : -400, opacity: 0, scale: 0.8 },
        animate: { x: 0, opacity: 1, scale: 1 },
        exit: { x: isRight ? 400 : -400, opacity: 0, scale: 0.8 },
      };
    };

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.article
            ref={ref}
            className={cn('fixed z-50', positionMap[position])}
            variants={getVariants()}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
              mass: 0.8,
            }}>
            <div
              className={cn(
                'flex items-start gap-3 rounded-lg border p-4 shadow-lg min-w-[320px] max-w-md',
                colorMap[type],
                className
              )}>
              {/* Icon */}
              <section className={cn('shrink-0', iconColorMap[type])}>
                {iconMap[type]}
              </section>

              {/* Content */}
              <section className="flex-1">
                {title && (
                  <h4 className="text-sm font-semibold mb-1">{title}</h4>
                )}
                <p className="text-sm leading-relaxed">{message}</p>
              </section>

              {/* Close button */}
              {closeable && (
                <button
                  type="button"
                  onClick={handleClose}
                  className={cn(
                    'shrink-0 rounded-md p-1 transition-colors hover:bg-black/5',
                    iconColorMap[type]
                  )}
                  aria-label="Close toast">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    );
  }
);

Toast.displayName = 'Toast';
