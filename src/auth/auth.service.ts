import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken() {
    // const user = { username: 'test' };
    // return this.jwtService.sign(user);
  }

  async checkToken() {
    // const user = { username: 'test' };
    // return this.jwtService.verify(user);
  }
}
