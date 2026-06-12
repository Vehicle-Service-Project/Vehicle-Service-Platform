import type { z } from 'zod';

import type { createUserSchema } from '../schemas/create-user.schema';
import type { updateUserSchema } from '../schemas/update-user.schema';
import type { userListItemSchema } from '../schemas/users.schemas';

export type UserListItem = z.infer<typeof userListItemSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
