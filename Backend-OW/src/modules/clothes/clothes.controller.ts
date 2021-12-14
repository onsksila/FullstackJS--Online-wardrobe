import { User } from 'src/modules/user/entities/user.entity';
import { Clothes } from './entities/clothes.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody } from '@nestjs/swagger';
import { uploadFile } from 'src/shared/file-upload.utils';
import { validateImages } from 'src/shared/filters.utils';
import { ClothesService } from './clothes.service';
import { CreateClothesDto } from './dto/create-clothes.dto';
import { UpdateClothesDto } from './dto/update-clothes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { ValidateObjectIdPipe } from 'src/shared/pipes';
import { isFieldUnique } from 'src/shared/isFieldUnique.utils';
import { findByField } from 'src/shared/findByField.utils';
import { SugestionStatus } from './Interfaces/SugestionStatus';
import { CreateScheduleDto } from './dto/create-schedule.tdo';
import { UpdateScheduleDto } from './dto/update-schedule.tdo';
import { Schedule } from './entities/schedule.entity';
import { SuggClientStatus } from './Interfaces/suggClientStatues';

@Controller('clothes')
export class ClothesController {
  constructor(
    @InjectRepository(Clothes)
    private readonly clothesRepository: Repository<Clothes>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    private readonly clothesService: ClothesService
  ) {}
  
  @Post('add')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({ type: CreateClothesDto })
  async create(@Body() clothesdata: CreateClothesDto, @UploadedFile() image) {
    //await isFieldUnique(this.productRepository, { title: productData.title });
    if (image) {
      validateImages(image);
      clothesdata.image = await uploadFile(image);
    }
    return await this.clothesService.create(clothesdata);
  }

  @Get('all')
  async findAll(): Promise<Clothes[]> {
    return await this.clothesService.findAll();
  }

  @Get('one/:id')
  @ApiBody({ description: 'id', required: true })
  async findById(@Param(new ValidateObjectIdPipe('Clothes')) params): Promise<Clothes> {
    return await findByField(this.clothesRepository, { _id: params.id }, true);
  }

  @Put('update/:id')
  @ApiBody({ type: UpdateClothesDto })
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param(new ValidateObjectIdPipe('Clothes')) params,
    @Body() clothesData: UpdateClothesDto,
    @UploadedFile() image
  ) {
    // Check if entity exists  throws exception if not exists!
    const toUpdate = await findByField(this.clothesRepository, { _id: params.id }, true);
    // Check if entity's title is unique throws exception if not !
    await isFieldUnique(this.clothesRepository, { title: clothesData.image }, params.id);
    if (image) {
      validateImages(image);
      clothesData.image = await uploadFile(image);
    }
    const clothes = await this.clothesService.update(toUpdate, clothesData);
    return clothes;
  }


  @Delete('delete/:id')
  async delete(@Param(new ValidateObjectIdPipe('Clothes')) params) {
    return await this.clothesService.delete(new ObjectID(params.id));
  }


  @Get('byuser/:id')
  @ApiBody({ description: 'id', required: true })
  async findByUser(@Param(new ValidateObjectIdPipe('User')) params): Promise<Clothes[]> {
    console.log(params.id)
    return await this.clothesService.findClothesByUser(params.id);
   
  }



///////////suggestion
@Get('user/:id')
   @ApiBody({ description: 'id', required: true })
  async findcolther(@Param(new ValidateObjectIdPipe('User')) params): Promise<SugestionStatus> {
     return await this.clothesService.findAleatoir(params.id);
 }

 @Get('sugg/:id/:st')
 @ApiBody({ description: 'id', required: true })
async findbyClient(@Param(new ValidateObjectIdPipe('User')) params,
      @Param(new ValidateObjectIdPipe('style')) param): Promise<SuggClientStatus> {
   return await this.clothesService.createSuggclient(params.id,param.st);
}
 ///schedule
 @Post('add-schedule')
 @ApiBody({ type: CreateScheduleDto })
 async createSchedule(@Body() schedledata: CreateScheduleDto) {
   console.log(" ppppppppppppppppppp " +schedledata.user)
   return await this.clothesService.createSchedule(schedledata);
 }

 //affichage Planning : 
 @Get('schedule/:id')
  async findSchedule(@Param(new ValidateObjectIdPipe('User')) params): Promise<Schedule> {
    return await this.clothesService.getSchedule(params.id);
  }

  //update Planning : 
  @Put('editSchedule/:id')
  @ApiBody({ type: UpdateScheduleDto })
  async updateSchedule(
    @Param(new ValidateObjectIdPipe('user')) params,
    @Body() scheduleData: UpdateScheduleDto,
  ) {
    // Check if entity exists  throws exception if not exists!
    const toUpdate = await this.scheduleRepository.findOne({where:{"user":{$eq:params.id}}})
    // Check if entity's title is unique throws exception if not !
    const schedule = await this.clothesService.updateSchedule(toUpdate, scheduleData);
    return schedule;
  }





}

