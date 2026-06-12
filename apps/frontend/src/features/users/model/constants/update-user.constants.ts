import type { UpdateUserInput, UserListItem } from '../types/users.types';

export const getUpdateUserDefaultValues = (
  user: UserListItem,
): UpdateUserInput => ({
  name: user.name,
});

export const UPDATE_USER_MESSAGES = {
  description:
    'Update the display name for this user. Email stays read-only for now.',
  submitIdle: 'Save name',
  submitLoading: 'Saving...',
  success: 'Name updated successfully.',
} as const;
