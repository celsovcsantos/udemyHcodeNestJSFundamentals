import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

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
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'halie.lesch89@ethereal.email',
          pass: 'qejGUcgArv1sXWRmBT',
        },
      },
      defaults: {
        from: '"TesteEmail" <halie.lesch89@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
  exports: [AppService],
})
export class AppModule {}
