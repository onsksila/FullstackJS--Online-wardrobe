import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length ,IsEnum, IsDate, IsNumber} from 'class-validator';

import { Transform,Type } from 'class-transformer';
import { Column } from 'typeorm';
import { ObjectID } from 'mongodb';

export class UpdateMeasurementDto {

    @ApiProperty()

    readonly lefthand: Number;


    @ApiProperty()
    
    readonly  leftleg: Number;
    


    @ApiProperty()
    readonly righthand: Number;

    @ApiProperty()
  
    readonly rightleg: Number;

    @ApiProperty()
    readonly shoulder: Number;
    
    @ApiProperty()
    readonly volume: Number;
 
    @ApiProperty()
    readonly User :ObjectID;


  
}

