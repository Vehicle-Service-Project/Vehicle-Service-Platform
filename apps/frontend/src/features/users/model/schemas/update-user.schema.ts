import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(30, 'Name must be 30 characters or fewer'),
});
