import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthRegisterDTO } from './dto/authRegister.dto';
import { UserService } from '@/user/user.service';

interface IToken {
  accessToken: string;
}

export { IToken };

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    // const user = { username: 'test' };
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: user.id.toString(),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  async checkToken() {
    // const user = { username: 'test' };
    // return this.jwtService.verify(user);
  }

  async login(email: string, password: string): Promise<IToken> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }
    return this.createToken(user);
  }

  async forget(email: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Email incorreto.');
    }
    return true;
  }

  async reset(password: string, token: string): Promise<IToken> {
    //validar o token
    const id = 0;
    const user = await this.prisma.user.update({
      where: { id },
      data: { password },
    });
    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }
}
