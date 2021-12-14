import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length ,IsEnum, IsDate, IsBoolean} from 'class-validator';

import { Transform,Type } from 'class-transformer';
enum Gender {
    Woman = 'woman',
    Man = 'man',
}


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @Length(3, 80)
    readonly name: string;
  
  
  
    @IsNotEmpty()
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @ApiProperty()
    @Length(3, 80)
    readonly password: string;

    @IsNotEmpty()
    @ApiProperty()
    @Type(() => Date)
    @IsDate({ message: 'give a corret date format'})
    readonly date: Date;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'gender must be either man or woman',
    })
    @ApiProperty()
    readonly gender: Gender;

    @ApiProperty()
    image: string;
    
    @IsNotEmpty()
    @IsBoolean()
    measures:boolean;

    @IsNotEmpty()
    @IsBoolean()
    readonly quiz:boolean;
}