import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

// 捕获所有 HttpException 类型异常（如 BadRequestException, NotFoundException）
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // 如果是我们定义的错误结构，提取 code/message
    let code = status;
    let message = '请求失败';

    if (typeof exceptionResponse === 'object' && 'code' in exceptionResponse) {
      code = (exceptionResponse as any).code;
      message = (exceptionResponse as any).message;
    } else if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
      message = (exceptionResponse as any).message;
    }

    response.status(status).json({
      code,
      message,
      data: null,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
