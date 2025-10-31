import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { fn } from 'storybook/test';
import { z } from 'zod';

import { ErrorMessage, Input, Label } from '@/components/Input';
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
  render: () => (
    <div className="w-full">
      <Label htmlFor="full-name">Full Name</Label>
      <Input id="full-name" type="text" placeholder="Enter your name" />
    </div>
  ),
};

/**
 * Input with helper text
 */
export const WithHelperText: Story = {
  render: () => (
    <div className="w-full">
      <Label htmlFor="username">Username</Label>
      <Input id="username" type="text" placeholder="username" />
      <p className="mt-1.5 text-sm text-gray-600">Choose a unique username</p>
    </div>
  ),
};

/**
 * Input in error state
 */
export const Error: Story = {
  render: () => (
    <div className="w-full">
      <Label htmlFor="email-error">Email</Label>
      <Input
        id="email-error"
        type="email"
        placeholder="email@example.com"
        error
      />
      <ErrorMessage>Please enter a valid email address</ErrorMessage>
    </div>
  ),
};

/**
 * Password input with visibility toggle
 */
export const Password: Story = {
  render: () => (
    <div className="w-full">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" placeholder="Enter password" />
    </div>
  ),
};

/**
 * Password input with visibility toggle and helper text
 */
export const PasswordWithHelper: Story = {
  render: () => (
    <div className="w-full">
      <Label htmlFor="password-helper">Password</Label>
      <Input
        id="password-helper"
        type="password"
        placeholder="Enter password"
      />
      <p className="mt-1.5 text-sm text-gray-600">
        Must be at least 8 characters
      </p>
    </div>
  ),
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
  render: () => (
    <div className="w-full">
      <Label htmlFor="age">Age</Label>
      <Input id="age" type="number" placeholder="Enter a number" clearable />
    </div>
  ),
};

/**
 * Email input with all features
 */
export const EmailWithClear: Story = {
  render: () => (
    <div className="w-full">
      <Label htmlFor="email-clear">Email Address</Label>
      <Input
        id="email-clear"
        type="email"
        placeholder="email@example.com"
        clearable
      />
      <p className="mt-1.5 text-sm text-gray-600">
        We'll never share your email
      </p>
    </div>
  ),
};

/**
 * Disabled input
 */
export const Disabled: Story = {
  render: () => (
    <div className="w-full">
      <Label htmlFor="disabled">Disabled Input</Label>
      <Input
        id="disabled"
        type="text"
        placeholder="Cannot edit"
        disabled
        defaultValue="Read only"
      />
    </div>
  ),
};

/**
 * Full featured example
 */
export const FullExample: Story = {
  render: () => (
    <div className="w-full">
      <Label htmlFor="password-input">Password</Label>
      <Input
        id="password-input"
        type="password"
        placeholder="Create a password"
        clearable
      />
      <p className="mt-1.5 text-sm text-gray-600">
        Use a strong password with mixed characters
      </p>
    </div>
  ),
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
          <div className="w-full">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register('username')}
              id="username"
              placeholder="john_doe"
              error={!!errors.username}
              clearable
            />
            {errors.username && (
              <ErrorMessage>{errors.username.message}</ErrorMessage>
            )}
          </div>

          <div className="w-full">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register('email')}
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              error={!!errors.email}
              clearable
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          <div className="w-full">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register('password')}
              id="password"
              type="password"
              placeholder="Enter password"
              error={!!errors.password}
              clearable
            />
            {errors.password ? (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            ) : (
              <p className="mt-1.5 text-sm text-gray-600">
                Must be at least 8 characters
              </p>
            )}
          </div>

          <div className="w-full">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              {...register('confirmPassword')}
              id="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              error={!!errors.confirmPassword}
              clearable
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </div>

          <div className="w-full">
            <Label htmlFor="age">Age</Label>
            <Input
              {...register('age')}
              id="age"
              type="number"
              placeholder="18"
              error={!!errors.age}
              clearable
            />
            {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
          </div>

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
