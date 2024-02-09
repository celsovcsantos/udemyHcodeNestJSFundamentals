import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  //imports: [forwardRef(() => UserModule), forwardRef(() => AuthModule)],
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        //configuração de limitação de requisições (limit) por tempo (ttl)
        name: 'short',
        ttl: 60000, //milisseundos
        limit: 10,
        //ignoreUserAgents: [/googlebot/gi],
      },
    ]),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
  exports: [AppService],
})
export class AppModule {}
