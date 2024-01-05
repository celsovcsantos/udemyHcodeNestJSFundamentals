import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dtIni = Date.now();
    return next.handle().pipe(
      tap(() => {
        const req = context.switchToHttp().getRequest();
        const result = {
          URL: req.url,
          METHOD: context.switchToHttp().getRequest().method,
          TIME: `${Date.now() - dtIni} ms`,
        };
        console.log(result);
      }),
    );
  }
}
