import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from '@/user/user.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({ secret: `E?g*[a<66iyxk41sU41%+IeG#jgW&ERh` }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
