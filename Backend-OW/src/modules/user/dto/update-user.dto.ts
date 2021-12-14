import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, IsEnum,IsDate, IsBoolean } from 'class-validator';
import { ObjectID } from 'mongodb';
import { Transform,Type } from 'class-transformer';

enum Gender {
    Man = 'man',
    Woman = 'woman',
}

export class UpdateUserDto {

    @ApiProperty()
   _id?: ObjectID;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @Length(3, 80)
    readonly name: string;
  
  
    /*@ApiProperty()
    @IsOptional()
    @IsString()
    @Length(3, 80)
    readonly username: string;
*/
    @IsNotEmpty()
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    /*@IsNotEmpty()
    @ApiProperty()
    @IsString()
    @Length(3, 80)
    readonly password: string;*/

    @IsNotEmpty()
    @ApiProperty()
    @Type(() => Date)//2020/02/24 ou 2020-02-24
    @IsDate({ message: 'give a corret date format'})
    readonly date: Date;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'gender must be either male or female',
    })
    @ApiProperty()
    readonly gender: Gender;

    @ApiProperty()
    image: string;

    @IsBoolean()
    measures:boolean;

    @IsBoolean()
    readonly quiz:boolean;
}
