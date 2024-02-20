import { AuthModule } from '@/modules/auth/auth.module';
import { UserIdCheckMiddleware } from '@/middlewares/userIdCheck.middleware';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.ALL });
  }
}
