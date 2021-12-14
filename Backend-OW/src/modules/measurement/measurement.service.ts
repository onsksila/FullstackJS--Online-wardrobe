import { User } from 'src/modules/user/entities/user.entity';
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cleaner } from 'src/shared/file-cleaner.utils';
import { findByField } from 'src/shared/findByField.utils';
import { DeleteResult, ObjectID, Repository } from 'typeorm';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { Measurement } from './entities/measurement.entity';


@Injectable({ scope: Scope.REQUEST })
export class MeasurementService {

  constructor(
    @InjectRepository(Measurement)
    private readonly measurementrepository: Repository<Measurement>
  ) {}

  async create(dto: CreateMeasurementDto): Promise<Measurement> {
    const newmeasurment = Object.assign(new Measurement(), dto);
    return await this.measurementrepository.save(newmeasurment);
  }

  async findAll(): Promise<Measurement[]> {
    return await this.measurementrepository.find();
  }

  async findMeasurementByUser(User: ObjectID):Promise<Measurement[]> {
    ///console.log('eeeeee')
      
     const find= await this.measurementrepository.find({where:{"User":{$eq:User}}})
      
       return await find
     }

  async update(toUpdate: Measurement, dto: UpdateMeasurementDto): Promise<Measurement> {
  
    Object.assign(toUpdate, dto);
    return await this.measurementrepository.save(toUpdate);
  }

  async delete(_id: ObjectID): Promise<DeleteResult> {
    const toDelete = await findByField(this.measurementrepository, { _id }, true);
   
    return await this.measurementrepository.delete({ _id });
  }

////////++++++++++++++++++++++++++++++++++++++++++++++++++


async getMeasureByUser(User: ObjectID):Promise<Measurement>{
  const find = await this.measurementrepository.findOne({where:{"User":{$eq:User}}})
  return await find;
}

async updatetMeasureByUser(toUpdate: Measurement, dto: UpdateMeasurementDto): Promise<Measurement> {
  Object.assign(toUpdate, dto);
  return await this.measurementrepository.save(toUpdate);
}


  //////


}