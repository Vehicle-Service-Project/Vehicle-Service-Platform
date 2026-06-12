import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const responseBody =
      typeof exceptionResponse === 'object' && exceptionResponse !== null
        ? (exceptionResponse as Record<string, unknown>)
        : null;

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : ((responseBody?.message as string | string[] | undefined) ??
          'Unexpected error');

    const error =
      typeof responseBody?.error === 'string'
        ? responseBody.error
        : exception.name;

    const safeMessage = status >= 500 ? 'Internal server error' : message;

    this.logger.error(
      {
        error,
        message: typeof message === 'string' ? message : message.join(', '),
        method: request.method,
        path: request.url,
        statusCode: status,
      },
      'HTTP exception',
    );

    response.status(status).json({
      statusCode: status,
      message: safeMessage,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
