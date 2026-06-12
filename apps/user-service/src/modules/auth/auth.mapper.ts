import { Injectable } from '@nestjs/common';

import { Account } from '../../../generated/prisma/client.js';
import type { PublicAccount } from './auth.types.js';

@Injectable()
export class AuthMapper {
  toPublicAccount(account: Account): PublicAccount {
    return {
      id: account.id,
      email: account.email,
      fullName: account.fullName,
      isActive: account.isActive,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }
}
