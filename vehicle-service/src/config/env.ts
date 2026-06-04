import 'dotenv/config';

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  NODE_ENV: process.env.NODE_ENV,
};
