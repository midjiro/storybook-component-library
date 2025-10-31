import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Input } from '../components/Input';

const meta = {
  title: 'Example/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'email', 'tel'],
    },
    clearable: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic text input field
 */
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
};

/**
 * Input with a label
 */
export const WithLabel: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter your name',
    label: 'Full Name',
  },
};

/**
 * Input with helper text
 */
export const WithHelperText: Story = {
  args: {
    type: 'text',
    placeholder: 'username',
    label: 'Username',
    helperText: 'Choose a unique username',
  },
};

/**
 * Input in error state
 */
export const Error: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
    label: 'Email',
    error: true,
    errorMessage: 'Please enter a valid email address',
  },
};

/**
 * Password input with visibility toggle
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
    label: 'Password',
  },
};

/**
 * Password input with visibility toggle and helper text
 */
export const PasswordWithHelper: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
    label: 'Password',
    helperText: 'Must be at least 8 characters',
  },
};

/**
 * Clearable text input
 */
export const Clearable: Story = {
  args: {
    type: 'text',
    placeholder: 'Type something...',
    clearable: true,
    defaultValue: 'Sample text',
  },
};

/**
 * Number input with clear button
 */
export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number',
    label: 'Age',
    clearable: true,
  },
};

/**
 * Email input with all features
 */
export const EmailWithClear: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
    label: 'Email Address',
    clearable: true,
    helperText: 'We\'ll never share your email',
  },
};

/**
 * Disabled input
 */
export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Cannot edit',
    label: 'Disabled Input',
    disabled: true,
    defaultValue: 'Read only',
  },
};

/**
 * Full featured example
 */
export const FullExample: Story = {
  args: {
    type: 'password',
    placeholder: 'Create a password',
    label: 'Password',
    clearable: true,
    helperText: 'Use a strong password with mixed characters',
    id: 'password-input',
  },
};
