import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '@/components/Input';

const meta = {
  title: 'Example/Label',
  component: Label,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic label
 */
export const Default: Story = {
  args: {
    children: 'Email Address',
  },
};

/**
 * Required label with asterisk
 */
export const Required: Story = {
  args: {
    children: 'Password',
    required: true,
  },
};

/**
 * Label with custom styling
 */
export const WithCustomStyling: Story = {
  args: {
    children: 'Custom Label',
    className: 'text-blue-600 font-bold',
  },
};
