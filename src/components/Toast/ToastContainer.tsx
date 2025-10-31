import { useEffect, useState } from 'react';

import { Toast, type ToastProps } from './Toast';

interface ToastItem extends ToastProps {
  id: string;
}

/**
 * Toast Container component that manages multiple toasts
 */
export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Listen for new toasts
  useEffect(() => {
    const handleShowToast = ({ detail }: CustomEvent<ToastProps>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = {
        ...detail,
        id,
      };
      setToasts(prev => [...prev, newToast]);
    };

    // @ts-expect-error - Custom event listener
    window.addEventListener('show-toast', handleShowToast);

    return () => {
      // @ts-expect-error - Custom event listener
      window.removeEventListener('show-toast', handleShowToast);
    };
  }, []);

  const handleClose = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Group toasts by position
  const groupedToasts = toasts.reduce((acc, toast) => {
    const position = toast.position || 'bottom-right';
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(toast);
    return acc;
  }, {} as Record<string, ToastItem[]>);

  return (
    <>
      {Object.entries(groupedToasts).map(([, positionToasts]) =>
        positionToasts.map(toast => (
          <Toast
            key={toast.id}
            {...toast}
            visible={true}
            onClose={() => handleClose(toast.id)}
          />
        ))
      )}
    </>
  );
};
