import { fetchJson } from '@/lib/api/fetch-json';

import 'server-only';

import {
  userListItemSchema,
  usersListSchema,
} from '../model/schemas/users.schemas';
import type {
  CreateUserInput,
  UpdateUserInput,
  UserListItem,
} from '../model/types/users.types';

const USERS_PREFIX = '/users';

const userServiceBaseUrl =
  process.env.USER_SERVICE_URL ?? 'http://localhost:4200';

const makeUsersUrl = (path = '') =>
  new URL(`${USERS_PREFIX}${path}`, userServiceBaseUrl);

export async function getUsers() {
  return fetchJson(makeUsersUrl(), usersListSchema, {
    next: {
      revalidate: 60,
    },
  });
}

export async function getUserById(id: string) {
  return fetchJson(makeUsersUrl(`/${id}`), userListItemSchema, {
    next: {
      revalidate: 60,
    },
  });
}

export async function createUser(input: CreateUserInput) {
  return fetchJson(makeUsersUrl(), userListItemSchema, {
    body: JSON.stringify(input),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}

export async function updateUserName(id: string, input: UpdateUserInput) {
  return fetchJson(makeUsersUrl(`/${id}`), userListItemSchema, {
    body: JSON.stringify(input),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
}

export async function deleteUser(id: string) {
  return fetchJson(makeUsersUrl(`/${id}`), userListItemSchema, {
    cache: 'no-store',
    method: 'DELETE',
  });
}

export type { UserListItem };
