import type { Meta, StoryObj } from '@storybook/react-vite';

import { ErrorMessage } from '../components/ErrorMessage';

const meta = {
  title: 'Example/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic error message
 */
export const Default: Story = {
  args: {
    children: 'This field is required',
  },
};

/**
 * Email validation error
 */
export const EmailError: Story = {
  args: {
    children: 'Please enter a valid email address',
  },
};

/**
 * Password validation error
 */
export const PasswordError: Story = {
  args: {
    children: 'Password must be at least 8 characters',
  },
};
