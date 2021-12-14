import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length ,IsEnum, IsDate} from 'class-validator';
import { ObjectID } from 'mongodb';
import { Transform,Type } from 'class-transformer';



export class UpdateClothesDto {

    @ApiProperty()
    _id?: ObjectID;
   
    @ApiProperty()
     image: string;
  
  
  
    
    @ApiProperty()
    @IsString()
    readonly name: string;

    
    @ApiProperty()
    @IsString()
    readonly season: string;


      
   
  
      
    
    @ApiProperty()
    @IsString()
    readonly style: string;

    @ApiProperty()
   readonly User :ObjectID;
  
}
