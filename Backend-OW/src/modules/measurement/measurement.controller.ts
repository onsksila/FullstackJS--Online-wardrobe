import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Measurement } from './entities/measurement.entity';
import { Repository } from 'typeorm';
import { CreateClothesDto } from '../clothes/dto/create-clothes.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody } from '@nestjs/swagger';
import { validateImages } from 'src/shared/filters.utils';
import { uploadFile } from 'src/shared/file-upload.utils';
import { ValidateObjectIdPipe } from 'src/shared/pipes';
import { ObjectID } from 'mongodb';
import { findByField } from 'src/shared/findByField.utils';
import { isFieldUnique } from 'src/shared/isFieldUnique.utils';

@Controller('measurement')
export class MeasurementController {
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementrepository: Repository<Measurement>,
    private readonly measurementservice: MeasurementService
  ) {}

  @Post('add')
  @ApiBody({ type: CreateMeasurementDto })
  async create(@Body() measurementdata: CreateMeasurementDto, @UploadedFile() profileImage,@UploadedFile() frontImage) {
    //await isFieldUnique(this.productRepository, { title: productData.title });
  
    return await this.measurementservice.create(measurementdata);
  }

  @Get('all')
  async findAll(): Promise<Measurement[]> {
    return await this.measurementservice.findAll();
  }

  @Get('one/:id')
  @ApiBody({ description: 'id', required: true })
  async findById(@Param(new ValidateObjectIdPipe('Measurement')) params): Promise<Measurement> {
    return await findByField(this.measurementrepository, { _id: params.id }, true);
  }

@Put('update/:id')
@ApiBody({ type: UpdateMeasurementDto })
async update(
  @Param(new ValidateObjectIdPipe('Measurement')) params,
  @Body() measurementdata: UpdateMeasurementDto
) {
  // Check if entity exists  throws exception if not exists!
  const toUpdate = await findByField(this.measurementrepository, { _id: params.id }, true);
  // Check if entity's title is unique throws exception if not !
  //await isFieldUnique(this.measurementrepository, { date: measurementdata. }, params.id);
 
  const mts = await this.measurementservice.update(toUpdate, measurementdata);
  return mts;
}

  @Delete('delete/:id')
  async delete(@Param(new ValidateObjectIdPipe('Measurement')) params) {
    return await this.measurementservice.delete(new ObjectID(params.id));
  }



  @Get('byuser/:id')
  @ApiBody({ description: 'id', required: true })
  async findMeasurementByUser(@Param(new ValidateObjectIdPipe('User')) params): Promise<Measurement[]> {
    console.log(params.id)
    return await this.measurementservice.findMeasurementByUser(params.id);
   
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
  @Get('measure/:id')
  async findMeasure(@Param(new ValidateObjectIdPipe('User')) params): Promise<Measurement> {
    return await this.measurementservice.getMeasureByUser(params.id);
  }


  @Put('editMeasure/:id')
  @ApiBody({ type: UpdateMeasurementDto })
  async updateMeasure(
    @Param(new ValidateObjectIdPipe('User')) params,
    @Body() measureData: UpdateMeasurementDto,
  ) {
    // Check if entity exists  throws exception if not exists!
    const toUpdate = await this.measurementrepository.findOne({where:{"User":{$eq:params.id}}})
    // Check if entity's title is unique throws exception if not !
    const measure = await this.measurementservice.updatetMeasureByUser(toUpdate, measureData);
    return measure;
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++


 
}