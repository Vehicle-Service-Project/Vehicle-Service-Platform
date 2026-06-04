import {
  Catch,
  ConflictException,
  ExceptionFilter,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client.js';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientValidationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: unknown) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          throw new ConflictException('Already exists');

        case 'P2025':
          throw new NotFoundException('Record not found');

        default:
          throw exception;
      }
    }

    if (exception instanceof Prisma.PrismaClientInitializationError) {
      throw new InternalServerErrorException('Database connection failed');
    }

    if (exception instanceof Prisma.PrismaClientValidationError) {
      throw new InternalServerErrorException('Database validation failed');
    }

    throw new InternalServerErrorException('Unexpected database error');
  }
}
