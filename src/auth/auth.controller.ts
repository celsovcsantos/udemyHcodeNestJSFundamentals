import { User } from '@/decorators/user.decorator';
import { AuthGuard } from '@/guards/auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService, IToken } from './auth.service';
import { AuthForgetDTO } from './dto/authForget.dto';
import { AuthLoginDTO } from './dto/authLogin.dto';
import { AuthRegisterDTO } from './dto/authRegister.dto';
import { AuthResetDTO } from './dto/authReset.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO): Promise<IToken> {
    return await this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user: any) {
    return { user };
  }
  // async me(@Headers('authorization') token: string) {
  //   //return this.authService.checkToken(token.split(' ')[1]);
  //   return this.authService.checkToken((token ?? '').replace('Bearer ', ''));
  // }
}
