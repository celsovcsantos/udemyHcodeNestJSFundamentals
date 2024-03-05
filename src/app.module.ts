import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserEntity } from './modules/user/entity/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
  //imports: [forwardRef(() => UserModule), forwardRef(() => AuthModule)],
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.ENV === 'TEST'
          ? `${__dirname}/../../.env.test`
          : `${__dirname}/../../.env`,
    }),
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'), // Use a default port if DB_PORT is undefined
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity],
      //autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'DEV',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
  exports: [AppService],
})
export class AppModule {}
