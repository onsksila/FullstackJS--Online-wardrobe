import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DataScrappingService } from './data-scrapping.service';
import { CreateDataScrappingDto } from './dto/create-data-scrapping.dto';
import { UpdateDataScrappingDto } from './dto/update-data-scrapping.dto';

@Controller('data-scrapping')
export class DataScrappingController {
  constructor(private readonly dataScrappingService: DataScrappingService) {}

  @Post()
  create(@Body() createDataScrappingDto: CreateDataScrappingDto) {
    return this.dataScrappingService.create(createDataScrappingDto);
  }

  @Get()
  findAll() {
    return this.dataScrappingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataScrappingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataScrappingDto: UpdateDataScrappingDto) {
    return this.dataScrappingService.update(+id, updateDataScrappingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataScrappingService.remove(+id);
  }
}
