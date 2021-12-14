import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ObjectID } from 'mongodb';

export class CreateClothTasteDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly colorTast: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly styleTast: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly partyTast: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @Length(3, 80)
    readonly weddingTast: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly shoesTast: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly workTast: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly acccessiorTast: string;

    @IsNotEmpty()
    @ApiProperty()
     readonly user: ObjectID;
}
