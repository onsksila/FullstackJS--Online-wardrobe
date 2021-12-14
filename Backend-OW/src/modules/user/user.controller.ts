import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { validateImages } from 'src/shared/filters.utils';
import { uploadFile } from 'src/shared/file-upload.utils';
import { ValidateObjectIdPipe } from 'src/shared/pipes';
import { findByField } from 'src/shared/findByField.utils';
import { isFieldUnique } from 'src/shared/isFieldUnique.utils';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateNewPasswordDto } from './dto/updateNewPassword-user.dto';
import { IUser } from './interfaces/user.interface';
const ObjectId = require('mongodb').ObjectId;

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, private readonly userService: UserService
  ) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUser: CreateUserDto,@UploadedFile() image) {
    await isFieldUnique(this.userRepository, { title: createUser.email });
    if (image) {
      validateImages(image);
      createUser.image = await uploadFile(image);
    }
    return await this.userService.create(createUser);
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  

  

  @Put('update/:id')
  @ApiBody({ type: UpdateUserDto })
  @UseInterceptors(FileInterceptor('image'))
    async update(
    @Param(new ValidateObjectIdPipe('User')) params,
    @Body() userData: UpdateUserDto,
    @UploadedFile() image
  ) {
    // Check if entity exists  throws exception if not exists!
  const toUpdate = await findByField(this.userRepository, { _id: params.id }, true);
    // Check if entity's username is unique throws exception if not !
    await isFieldUnique(this.userRepository, { title: userData.email }, params.id);
   if (image) {
      validateImages(image);
      userData.image = await uploadFile(image);
    }
    const product = await this.userService.update(toUpdate, userData);
    return product;
  }


  @Get('one/:id')
  findOneById(@Param(new ValidateObjectIdPipe('User')) params) {
   // console.log("paramps"+params.id)
    return this.userService.findOneById(new ObjectId(params.id));
   
  }



  @Delete('delete/:id')
  async delete(@Param(new ValidateObjectIdPipe('User')) params) {
    return await this.userService.delete(new ObjectId(params.id));
  }
  
  
///password 


@Post('forgot-password/:email')
@ApiBody({ description: 'email', required: true })
async forgotPassword(@Param() params): Promise<IUser> {
  // throws error 404 if not found
  const user = await this.userService.forgotPassword(params.email);

  await this.userService.sendResetPasswordEmail(user);
  return user;
}

@Post('reset-password')
@ApiBody({ type: [UpdateNewPasswordDto] })
async updateNewPassword(@Body() updateNewPasswordDto: UpdateNewPasswordDto): Promise<IUser> {
  return await this.userService.updateNewPassword(updateNewPasswordDto);
}

}
