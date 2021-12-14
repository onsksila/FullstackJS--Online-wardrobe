import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length ,IsEnum, IsDate} from 'class-validator';
import { ObjectID } from 'mongodb';
import { Transform,Type } from 'class-transformer';



export class CreateScheduleDto {

    @ApiProperty()
    @IsString()
    readonly monday: string;

    @ApiProperty()
    @IsString()
    readonly tuesday: string;

    
    @ApiProperty()
    @IsString()
    readonly wednesday: string;

    @ApiProperty()
    @IsString()
    readonly thursday: string;
   
    @ApiProperty()
    @IsString()
    readonly friday: string;

    @ApiProperty()
    @IsString()
    readonly saturday: string;

    @ApiProperty()
    @IsString()
    readonly sunday: string;

    @ApiProperty()
    readonly user :ObjectID;
  
}