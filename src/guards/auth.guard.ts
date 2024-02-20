import { AuthService } from '@/modules/auth/auth.service';
import { UserService } from '@/modules/user/user.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    try {
      const data = this.authService.checkToken(
        (authorization ?? '').replace('Bearer ', ''),
      );

      request.tokenPayload = data;
      request.user = await this.userService.show(data.id);

      return true;
    } catch (error) {
      return false;
    }
  }
}
