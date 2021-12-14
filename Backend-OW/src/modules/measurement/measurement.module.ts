
import { MiddlewareConsumer, Module,NestModule,RequestMethod } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './entities/measurement.entity';
import { AuthMiddleware } from '../user/middlewares/auth.middleware';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Measurement])],
  controllers: [MeasurementController],
  providers: [MeasurementService]
})
export class MeasurementModule {}
