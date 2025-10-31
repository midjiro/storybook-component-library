import type { Meta, StoryObj } from '@storybook/react-vite';

import { ToastContainer } from '@/components/ToastContainer';
import { toast } from '@/components/Toast/utils/toast';

const meta = {
  title: 'Example/ToastTrigger',
  component: ToastContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToastContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Container component that displays toasts. Use the toast() function to trigger notifications.
 */
export const Default: Story = {
  render: () => (
    <div className="p-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Toast Trigger Examples</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              toast({
                message: 'This is an info message',
                type: 'info',
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Show Info Toast
          </button>
          <button
            onClick={() =>
              toast({
                message: 'Operation completed successfully!',
                type: 'success',
              })
            }
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Show Success Toast
          </button>
          <button
            onClick={() =>
              toast({
                message: 'Please review your changes',
                type: 'warning',
              })
            }
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Show Warning Toast
          </button>
          <button
            onClick={() =>
              toast({
                message: 'Something went wrong',
                type: 'error',
              })
            }
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Show Error Toast
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  ),
};

/**
 * Toast with title and custom duration
 */
export const WithTitle: Story = {
  render: () => (
    <div className="p-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Toasts with Title</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              toast({
                title: 'Success!',
                message: 'Your profile has been updated',
                type: 'success',
              })
            }
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Toast with Title
          </button>
          <button
            onClick={() =>
              toast({
                title: 'Error',
                message: 'Failed to save changes',
                type: 'error',
              })
            }
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Error with Title
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  ),
};

/**
 * Multiple toasts from different positions
 */
export const MultiplePositions: Story = {
  render: () => (
    <div className="p-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Different Positions</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              toast({
                message: 'Top Left',
                position: 'top-left',
                type: 'info',
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Top Left
          </button>
          <button
            onClick={() =>
              toast({
                message: 'Top Center',
                position: 'top-center',
                type: 'success',
              })
            }
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Top Center
          </button>
          <button
            onClick={() =>
              toast({
                message: 'Top Right',
                position: 'top-right',
                type: 'warning',
              })
            }
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Top Right
          </button>
          <button
            onClick={() =>
              toast({
                message: 'Bottom Left',
                position: 'bottom-left',
                type: 'error',
              })
            }
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Bottom Left
          </button>
          <button
            onClick={() =>
              toast({
                message: 'Bottom Center',
                position: 'bottom-center',
                type: 'info',
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Bottom Center
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  ),
};

/**
 * Custom duration and no auto-dismiss
 */
export const CustomDuration: Story = {
  render: () => (
    <div className="p-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Custom Duration</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              toast({
                message: 'Dismisses in 2 seconds',
                type: 'info',
                duration: 2000,
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            2 Seconds
          </button>
          <button
            onClick={() =>
              toast({
                message: 'Dismisses in 10 seconds',
                type: 'success',
                duration: 10000,
              })
            }
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            10 Seconds
          </button>
          <button
            onClick={() =>
              toast({
                message: 'Will not auto-dismiss (duration: 0)',
                type: 'warning',
                duration: 0,
              })
            }
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            No Auto-Dismiss
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  ),
};
