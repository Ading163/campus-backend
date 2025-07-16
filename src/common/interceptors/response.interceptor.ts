import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// NestInterceptor 接口：用于拦截请求 / 响应数据
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  // 每个请求都会经过这里
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 最终返回格式统一为：
        return {
          code: 200,
          message: '请求成功',
          data,
        };
      }),
    );
  }
}
