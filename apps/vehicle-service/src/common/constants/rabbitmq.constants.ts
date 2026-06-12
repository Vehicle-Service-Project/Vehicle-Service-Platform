export const RMQ_CLIENTS = {
  USERS: 'rmq.users.client',
} as const;

export const RMQ_QUEUES = {
  USERS: 'users.queue',
} as const;

export const RMQ_PATTERNS = {
  USER_CREATED: 'user.created',
} as const;
