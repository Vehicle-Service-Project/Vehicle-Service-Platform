import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PinoLogger } from 'nestjs-pino';

import { PrismaClient } from '../../../generated/prisma/client.js';
import { env } from '../../config/env.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly logger: PinoLogger) {
    const adapter = new PrismaPg({
      connectionString: env.DATABASE_URL,
    });

    super({ adapter });
  }

  async onModuleInit() {
    this.logger.info('Connecting to PostgreSQL with Prisma');
    await this.$connect();
    this.logger.info('Prisma connection established');
  }

  async onModuleDestroy() {
    this.logger.info('Closing Prisma connection');
    await this.$disconnect();
  }
}
