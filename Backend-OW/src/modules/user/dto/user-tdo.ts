import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length, IsEmail,IsDate, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ObjectID } from 'typeorm';
export class UserDto {


    @IsNotEmpty()
    readonly _id: ObjectID;
    
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
  
    /*@ApiProperty()
    @IsString()
    readonly username: string;*/

    @IsNotEmpty()
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsOptional()
    @Length(3, 80)
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly gender: string;

    
    @IsNotEmpty()
    @ApiProperty()
    @IsDate()
    readonly date: Date;
    
    @ApiProperty()
    image: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly measures:boolean;

    @IsNotEmpty()
    @IsBoolean()
    readonly quiz:boolean;

}