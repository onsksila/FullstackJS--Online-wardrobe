import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDataScrappingDto } from './dto/create-data-scrapping.dto';
import { UpdateDataScrappingDto } from './dto/update-data-scrapping.dto';
import { DataScrapping } from './entities/data-scrapping.entity';

@Injectable({ scope: Scope.REQUEST })
export class DataScrappingService {

  constructor(  
    @InjectRepository(DataScrapping)
  private readonly dataScrappingRepository: Repository<DataScrapping>){}  

  create(createDataScrappingDto: CreateDataScrappingDto) {
    return 'This action adds a new dataScrapping';
  }

  findAll() {
    return this.dataScrappingRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} dataScrapping`;
  }

  update(id: number, updateDataScrappingDto: UpdateDataScrappingDto) {
    return `This action updates a #${id} dataScrapping`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataScrapping`;
  }
}
