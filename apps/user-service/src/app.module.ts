import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';

import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { PrismaModule } from './infrastructure/prisma/prisma.module.js';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
