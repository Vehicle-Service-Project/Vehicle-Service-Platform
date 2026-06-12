import { z } from 'zod';

export const vehicleListItemSchema = z.object({
  id: z.number(),
  isDraft: z.boolean(),
  make: z.string(),
  model: z.string(),
  userId: z.string(),
  year: z.number().nullable(),
});

export const vehiclesListSchema = z.array(vehicleListItemSchema);
