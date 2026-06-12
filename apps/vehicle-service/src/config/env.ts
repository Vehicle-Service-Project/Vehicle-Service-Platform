import 'dotenv/config';

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  LOG_LEVEL: process.env.LOG_LEVEL ?? 'info',
  PORT: process.env.PORT,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
};
