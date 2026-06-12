import type { z } from 'zod';

import 'server-only';

import { ApiError, apiErrorSchema } from './api-error';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type FetchJsonOptions = Omit<RequestInit, 'method'> & {
  method?: HttpMethod;
};

export async function fetchJson<T>(
  input: string | URL,
  schema: z.ZodType<T>,
  init?: FetchJsonOptions,
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const parsedError = apiErrorSchema.safeParse(payload);

    throw new ApiError(
      parsedError.success
        ? formatApiErrorMessage(parsedError.data.message)
        : 'Request failed',
      response.status,
      parsedError.success ? parsedError.data : undefined,
    );
  }

  return schema.parse(payload);
}

function formatApiErrorMessage(message: string | string[]) {
  return Array.isArray(message) ? message.join(', ') : message;
}
