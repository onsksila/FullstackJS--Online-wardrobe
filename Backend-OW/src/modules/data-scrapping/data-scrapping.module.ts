import { Module } from '@nestjs/common';
import { DataScrappingService } from './data-scrapping.service';
import { DataScrappingController } from './data-scrapping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataScrapping } from './entities/data-scrapping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataScrapping])],
  controllers: [DataScrappingController],
  providers: [DataScrappingService]
})
export class DataScrappingModule {}
