import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: `E?g*[a<66iyxk41sU41%+IeG#jgW&ERh` })],
  controllers: [],
  providers: [],
  exports: [],
})
export class AuthModule {}
