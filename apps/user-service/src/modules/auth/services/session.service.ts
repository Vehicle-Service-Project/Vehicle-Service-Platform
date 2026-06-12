import { Injectable } from '@nestjs/common';
import type { Response } from 'express';

import { env } from '../../../config/env.js';
import { SESSION_HOST_COOKIE_PREFIX } from '../../../infrastructure/session/session.constants.js';
import type { RequestWithSession, SessionWithAccount } from '../auth.types.js';

@Injectable()
export class SessionService {
  async regenerate(request: RequestWithSession): Promise<SessionWithAccount> {
    return new Promise<SessionWithAccount>((resolve, reject) => {
      request.session.regenerate((error) => {
        if (error) {
          reject(this.toError(error));
          return;
        }

        resolve(request.session);
      });
    });
  }

  async save(session: SessionWithAccount) {
    await new Promise<void>((resolve, reject) => {
      session.save((error) => {
        if (error) {
          reject(this.toError(error));
          return;
        }

        resolve();
      });
    });
  }

  async destroy(session: SessionWithAccount) {
    await new Promise<void>((resolve, reject) => {
      session.destroy((error) => {
        if (error) {
          reject(this.toError(error));
          return;
        }

        resolve();
      });
    });
  }

  clearCookie(response: Response) {
    const sessionCookieName =
      env.NODE_ENV === 'production'
        ? `${SESSION_HOST_COOKIE_PREFIX}${env.SESSION_COOKIE_NAME}`
        : env.SESSION_COOKIE_NAME;

    response.clearCookie(sessionCookieName, {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.NODE_ENV === 'production',
    });
  }

  private toError(error: unknown) {
    return error instanceof Error
      ? error
      : new Error('Unexpected session error');
  }
}
