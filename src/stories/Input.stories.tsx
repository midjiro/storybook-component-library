import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { zodResolver } from '@hookform/resolvers/zod';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components/Input';
import { toast } from '@/components/Toast';

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
    helperText: "We'll never share your email",
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

/**
 * Input with React Hook Form and Zod validation
 */
export const WithReactHookForm: StoryObj = {
  render: () => {
    const [submittedData, setSubmittedData] = useState<any>(null);

    // Zod schema for validation
    const signUpSchema = z
      .object({
        email: z.string().email('Please enter a valid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
        username: z.string().min(3, 'Username must be at least 3 characters'),
        age: z.string().min(1, 'Age is required'),
      })
      .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
      })
      .refine(
        data => {
          const age = parseInt(data.age);
          return !isNaN(age) && age >= 18;
        },
        {
          message: 'You must be at least 18 years old',
          path: ['age'],
        }
      );

    type SignUpForm = z.infer<typeof signUpSchema>;

    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    } = useForm<SignUpForm>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        age: '',
      },
    });

    const onSubmit = async (data: SignUpForm) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmittedData(data);
      toast({
        type: 'success',
        message: 'Form submitted successfully!',
        title: 'Success',
      });
      reset();
    };

    return (
      <div className="max-w-md p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900">Sign Up Form</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register('username')}
            label="Username"
            placeholder="john_doe"
            error={!!errors.username}
            errorMessage={errors.username?.message}
            clearable
          />

          <Input
            {...register('email')}
            type="email"
            label="Email"
            placeholder="john.doe@example.com"
            error={!!errors.email}
            errorMessage={errors.email?.message}
            clearable
          />

          <Input
            {...register('password')}
            type="password"
            label="Password"
            placeholder="Enter password"
            error={!!errors.password}
            errorMessage={errors.password?.message}
            helperText="Must be at least 8 characters"
            clearable
          />

          <Input
            {...register('confirmPassword')}
            type="password"
            label="Confirm Password"
            placeholder="Re-enter password"
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            clearable
          />

          <Input
            {...register('age')}
            type="number"
            label="Age"
            placeholder="18"
            error={!!errors.age}
            errorMessage={errors.age?.message}
            clearable
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Submitting...' : 'Sign Up'}
            </button>

            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
              Reset
            </button>
          </div>
        </form>

        {submittedData && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="font-semibold text-green-900 mb-2">
              Form Submitted:
            </h3>
            <pre className="text-sm text-green-800 overflow-auto">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  },
};
