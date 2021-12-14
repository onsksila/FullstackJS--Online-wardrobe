import { MiddlewareConsumer, Module,NestModule,RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './middlewares/auth.middleware';

 
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: 'user', method: RequestMethod.GET },
    { path: 'user/*', method: RequestMethod.GET },
      { path: 'user/*', method: RequestMethod.DELETE },
      { path: 'user/*', method: RequestMethod.PUT },
      { path: 'user', method: RequestMethod.POST }
    );
  }}
