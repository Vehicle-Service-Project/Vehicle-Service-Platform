import { Injectable } from '@nestjs/common';
import { RedisStore } from 'connect-redis';
import session from 'express-session';
import { PinoLogger } from 'nestjs-pino';

import { env } from '../../config/env.js';
import { RedisService } from '../redis/redis.service.js';
import {
  SESSION_HOST_COOKIE_PREFIX,
  SESSION_KEY_PREFIX,
} from './session.constants.js';

@Injectable()
export class SessionService {
  constructor(
    private readonly redisService: RedisService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(SessionService.name);
  }

  async createMiddleware() {
    await this.redisService.connect();
    const redisClient = this.redisService.getClient();
    const isProduction = env.NODE_ENV === 'production';
    const sessionCookieName = isProduction
      ? `${SESSION_HOST_COOKIE_PREFIX}${env.SESSION_COOKIE_NAME}`
      : env.SESSION_COOKIE_NAME;

    return session({
      store: new RedisStore({
        client: redisClient,
        prefix: SESSION_KEY_PREFIX,
        ttl: env.SESSION_TTL_SECONDS,
      }),
      name: sessionCookieName,
      secret: env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: isProduction,
        maxAge: env.SESSION_TTL_SECONDS * 1000,
      },
    });
  }
}
