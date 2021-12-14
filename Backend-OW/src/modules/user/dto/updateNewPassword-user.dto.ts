import { IsNotEmpty, IsJWT, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class UpdateNewPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  readonly token: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(4, 16)
  password: string;

  @BeforeUpdate()  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);  
}

}
