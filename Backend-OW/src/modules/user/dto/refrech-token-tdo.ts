import { IsNotEmpty } from 'class-validator';

export class RefrechTokenDto {  
    @IsNotEmpty()  readonly email: string
}