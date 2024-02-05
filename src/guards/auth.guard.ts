import { AuthService } from '@/auth/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    try {
      const data = this.authService.checkToken(
        (authorization ?? '').replace('Bearer ', ''),
      );
      request.tokenPayload = data;
      return true;
    } catch (error) {
      return false;
    }
  }
}
