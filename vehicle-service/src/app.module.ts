import { Module } from '@nestjs/common';

import { VehiclesModule } from './vehicles/vehicles.module.js';
import { PrismaModule } from './infrastructure/prisma/prisma.module.js';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { env } from './config/env.js';

@Module({
  imports: [
    PrismaModule,
    VehiclesModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
      },
    }),
  ],
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
