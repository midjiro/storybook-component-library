import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toast } from '../components/Toast';

const meta = {
  title: 'Example/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'warning', 'error', 'success'],
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
    },
    duration: {
      control: { type: 'number' },
    },
    closeable: {
      control: 'boolean',
    },
    visible: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Info toast notification
 */
export const Info: Story = {
  args: {
    message: 'This is an informational message',
    type: 'info',
  },
};

/**
 * Success toast notification
 */
export const Success: Story = {
  args: {
    message: 'Operation completed successfully!',
    type: 'success',
  },
};

/**
 * Warning toast notification
 */
export const Warning: Story = {
  args: {
    message: 'Please review your changes before submitting',
    type: 'warning',
  },
};

/**
 * Error toast notification
 */
export const Error: Story = {
  args: {
    message: 'Something went wrong. Please try again.',
    type: 'error',
  },
};

/**
 * Toast with title
 */
export const WithTitle: Story = {
  args: {
    title: 'Success!',
    message: 'Your profile has been updated successfully',
    type: 'success',
  },
};

/**
 * Toast without close button
 */
export const WithoutClose: Story = {
  args: {
    message: 'This toast will auto-dismiss in 5 seconds',
    type: 'info',
    closeable: false,
  },
};

/**
 * Long message toast
 */
export const LongMessage: Story = {
  args: {
    title: 'Important Notice',
    message: 'This is a longer message that demonstrates how the toast handles multiple lines of text gracefully and wraps appropriately.',
    type: 'warning',
  },
};

/**
 * Auto-dismiss disabled
 */
export const NoAutoDismiss: Story = {
  args: {
    message: 'This toast will not auto-dismiss',
    type: 'info',
    duration: 0,
  },
};

/**
 * Different positions - Top Right
 */
export const TopRight: Story = {
  args: {
    message: 'Toast in top-right corner',
    type: 'info',
    position: 'top-right',
  },
};

/**
 * Different positions - Top Left
 */
export const TopLeft: Story = {
  args: {
    message: 'Toast in top-left corner',
    type: 'info',
    position: 'top-left',
  },
};

/**
 * Different positions - Bottom Left
 */
export const BottomLeft: Story = {
  args: {
    message: 'Toast in bottom-left corner',
    type: 'info',
    position: 'bottom-left',
  },
};

/**
 * Different positions - Top Center
 */
export const TopCenter: Story = {
  args: {
    message: 'Toast in top-center',
    type: 'info',
    position: 'top-center',
  },
};

/**
 * Different positions - Bottom Center
 */
export const BottomCenter: Story = {
  args: {
    message: 'Toast in bottom-center',
    type: 'info',
    position: 'bottom-center',
  },
};
