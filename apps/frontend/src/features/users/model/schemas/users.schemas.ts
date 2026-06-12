import { z } from 'zod';

export const userListItemSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  avatar: z.url().nullable(),
});

export const usersListSchema = z.array(userListItemSchema);
