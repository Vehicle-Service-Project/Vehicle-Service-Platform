import { z } from 'zod';

export const apiErrorSchema = z.object({
  statusCode: z.number().optional(),
  message: z.union([z.string(), z.array(z.string())]),
  error: z.string().optional(),
  path: z.string().optional(),
  timestamp: z.string().optional(),
});

export type ApiErrorDetails = z.infer<typeof apiErrorSchema>;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly details?: ApiErrorDetails,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
