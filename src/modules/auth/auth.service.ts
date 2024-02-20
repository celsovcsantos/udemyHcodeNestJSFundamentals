import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserService } from '@/modules/user/user.service';
import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthRegisterDTO } from './dto/authRegister.dto';

interface IToken {
  accessToken: string;
}

export { IToken };

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createToken(user: UserEntity) {
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
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });
      return data;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string): Promise<IToken> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    //console.log({ user });
    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    return this.createToken(user);
  }

  async forget(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Email incorreto.');
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '30 minutes',
        subject: user.id.toString(),
        issuer: 'forget',
        audience: this.audience,
      },
    );

    await this.mailer.sendMail({
      to: user.email,
      subject: 'Recuperação de senha',
      template: 'forget',
      context: {
        name: user.name,
        token,
      },
    });

    return true;
  }

  async reset(password: string, token: string): Promise<IToken> {
    //validar o token

    try {
      const { id } = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: this.audience,
      });

      if (isNaN(id)) throw new UnauthorizedException('Token inválido.');

      password = await this.userService.createHashPassword(password);

      await this.userRepository.update({ id }, { password });
      const user = await this.userService.show(id);
      if (!user) throw new NotFoundException('Usuário não encontrado.');
      return this.createToken(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }
}
