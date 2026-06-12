import { z } from 'zod';

export const createVehicleSchema = z.object({
  make: z
    .string()
    .trim()
    .min(1, 'Make is required')
    .max(25, 'Make must be 25 characters or fewer'),
  model: z
    .string()
    .trim()
    .min(1, 'Model is required')
    .max(25, 'Model must be 25 characters or fewer'),
  year: z.preprocess((value) => {
    if (value === '' || value === null || value === undefined) {
      return undefined;
    }

    return value;
  }, z.coerce.number().int().min(1886).max(2100).optional()),
});
