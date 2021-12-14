import { MiddlewareConsumer, Module,NestModule,RequestMethod } from '@nestjs/common';
import { ClothTasteService } from './cloth-taste.service';
import { ClothTasteController } from './cloth-taste.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClothTaste } from './entities/cloth-taste.entity';
import { AuthMiddleware } from '../user/middlewares/auth.middleware';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule,TypeOrmModule.forFeature([ClothTaste])],
  controllers: [ClothTasteController],
  providers: [ClothTasteService]
})
export class ClothTasteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: 'cloth-taste', method: RequestMethod.GET },
    { path: 'cloth-taste/*', method: RequestMethod.GET },
      { path: 'cloth-taste', method: RequestMethod.POST }
    );
  }}