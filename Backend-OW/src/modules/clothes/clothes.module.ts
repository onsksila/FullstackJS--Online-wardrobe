import { Clothes } from './entities/clothes.entity';
import { MiddlewareConsumer, Module,NestModule,RequestMethod } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../user/middlewares/auth.middleware';
import { UserModule } from '../user/user.module';
import { ClothTaste } from '../cloth-taste/entities/cloth-taste.entity';
import { Schedule } from './entities/schedule.entity';
import { Suggestion } from './entities/suggestion.entity';

@Module({
  imports: [UserModule,
    TypeOrmModule.forFeature([Clothes]),
    TypeOrmModule.forFeature([Suggestion]),
    TypeOrmModule.forFeature([Schedule]),
    TypeOrmModule.forFeature([ClothTaste]) 
  ],    
  controllers: [ClothesController],
  providers: [ClothesService],
  exports: [ClothesService]
})
export class ClothesModule {}
