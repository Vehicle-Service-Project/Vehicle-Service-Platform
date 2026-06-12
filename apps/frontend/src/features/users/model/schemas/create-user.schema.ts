import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.email('Enter a valid email address'),
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(30, 'Name must be 30 characters or fewer'),
});
