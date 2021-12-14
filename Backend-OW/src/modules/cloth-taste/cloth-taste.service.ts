import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClothTasteDto } from './dto/create-cloth-taste.dto';
import { UpdateClothTasteDto } from './dto/update-cloth-taste.dto';
import { ClothTaste } from './entities/cloth-taste.entity';

@Injectable()
export class ClothTasteService {
 
  constructor(
    @InjectRepository(ClothTaste)
    
    private readonly clothesRepository: Repository<ClothTaste>
  ) {}

  async create(createClothTasteDto: CreateClothTasteDto) : Promise<ClothTaste> {
    const newClothTaste = Object.assign(new ClothTaste(), createClothTasteDto);
    return await this.clothesRepository.save(newClothTaste);
  }

  findAll() {
    return `This action returns all clothTaste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clothTaste`;
  }

  update(id: number, updateClothTasteDto: UpdateClothTasteDto) {
    return `This action updates a #${id} clothTaste`;
  }

  remove(id: number) {
    return `This action removes a #${id} clothTaste`;
  }
}
