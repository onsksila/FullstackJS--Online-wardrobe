import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClothTasteService } from './cloth-taste.service';
import { CreateClothTasteDto } from './dto/create-cloth-taste.dto';
import { UpdateClothTasteDto } from './dto/update-cloth-taste.dto';
import { ClothTaste } from './entities/cloth-taste.entity';

@Controller('cloth-taste')
export class ClothTasteController {
  constructor(
    @InjectRepository(ClothTaste)
    private readonly clothesRepository: Repository<ClothTaste>,
    private readonly clothTasteService: ClothTasteService) {}

    @Post("add")
    @ApiBody({ type: CreateClothTasteDto })
   async create(@Body() createClothTasteDto: CreateClothTasteDto) {
      return await this.clothTasteService.create(createClothTasteDto);
    }

  @Get()
  findAll() {
    return this.clothTasteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clothTasteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClothTasteDto: UpdateClothTasteDto) {
    return this.clothTasteService.update(+id, updateClothTasteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clothTasteService.remove(+id);
  }
}
