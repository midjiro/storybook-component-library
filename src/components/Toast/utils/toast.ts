import type { ToastProps } from '@/components/Toast/Toast';

/**
 * Trigger a toast notification
 */
export const toast = (props: ToastProps) => {
  const event = new CustomEvent('show-toast', { detail: props });
  window.dispatchEvent(event);
};
