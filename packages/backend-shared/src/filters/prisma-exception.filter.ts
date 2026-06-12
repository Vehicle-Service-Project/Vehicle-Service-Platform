import type { ExceptionFilter } from "@nestjs/common";
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import type { PinoLogger } from "nestjs-pino";

type PrismaErrorConstructors = {
  InitializationError: new (...args: any[]) => Error;
  KnownRequestError: new (...args: any[]) => Error & { code: string };
  ValidationError: new (...args: any[]) => Error;
};

export abstract class PrismaExceptionFilterBase implements ExceptionFilter {
  constructor(
    private readonly logger: PinoLogger,
    private readonly prismaErrors: PrismaErrorConstructors,
  ) {}

  catch(exception: unknown) {
    if (exception instanceof this.prismaErrors.KnownRequestError) {
      switch (exception.code) {
        case "P2002":
          this.logger.warn(
            {
              code: exception.code,
            },
            "Prisma unique constraint violation",
          );
          throw new ConflictException("Already exists");

        case "P2025":
          this.logger.warn(
            {
              code: exception.code,
            },
            "Prisma record not found",
          );
          throw new NotFoundException("Record not found");

        default:
          this.logger.error(
            {
              code: exception.code,
              err: exception,
            },
            "Unhandled Prisma known request error",
          );
          throw exception;
      }
    }

    if (exception instanceof this.prismaErrors.InitializationError) {
      this.logger.error({ err: exception }, "Prisma initialization failed");
      throw new InternalServerErrorException("Database connection failed");
    }

    if (exception instanceof this.prismaErrors.ValidationError) {
      this.logger.error({ err: exception }, "Prisma validation failed");
      throw new InternalServerErrorException("Database validation failed");
    }

    this.logger.error({ err: exception }, "Unexpected Prisma error");
    throw new InternalServerErrorException("Unexpected database error");
  }
}
