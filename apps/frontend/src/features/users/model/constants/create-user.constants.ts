import type { CreateUserInput } from '../types/users.types';

export const CREATE_USER_DEFAULT_VALUES: CreateUserInput = {
  email: '',
  name: '',
};

export const CREATE_USER_MESSAGES = {
  description:
    'Add a new user with a valid email and a short display name. The list will refresh after successful creation.',
  submitIdle: 'Create user',
  submitLoading: 'Creating user...',
  success: 'User created successfully.',
} as const;
