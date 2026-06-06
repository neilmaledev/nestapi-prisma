import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
// import * as Sentry from '@sentry/node';

@Catch() // catches EVERYTHING
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const isHttp = exception instanceof HttpException;

    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = isHttp
      ? exception.getResponse()
      : null;

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any)?.message || 'Internal server error';

    const error =
      typeof exceptionResponse === 'object'
        ? (exceptionResponse as any)?.error
        : undefined;

    // send to sentry if server error
    // if (status === 500) {
    //   Sentry.captureException(exception);
    // }

    // unified response
    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      error,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    });
  }
}