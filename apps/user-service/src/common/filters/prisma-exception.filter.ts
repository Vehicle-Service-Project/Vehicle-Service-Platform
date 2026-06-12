import { Catch } from '@nestjs/common';
import { PrismaExceptionFilterBase } from '@vsp/backend-shared/filters';
import { PinoLogger } from 'nestjs-pino';

import { Prisma } from '../../../generated/prisma/client.js';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientValidationError,
)
export class PrismaExceptionFilter extends PrismaExceptionFilterBase {
  constructor(logger: PinoLogger) {
    super(logger, {
      KnownRequestError: Prisma.PrismaClientKnownRequestError,
      InitializationError: Prisma.PrismaClientInitializationError,
      ValidationError: Prisma.PrismaClientValidationError,
    });
  }
}
