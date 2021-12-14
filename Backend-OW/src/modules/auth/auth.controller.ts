import { Injectable, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto'
import {  LoginUserDto  }  from 'src/modules/user/dto/login-user-dto';
import { LoginStatus } from './interfaces/login-status.interface'
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')  
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({ type: CreateUserDto })
  public async register(@Body() createUserDto: CreateUserDto,  ): Promise<RegistrationStatus> {    
      const result: 
      
      RegistrationStatus = await this.authService.register(createUserDto,);
      if (!result.success) {
          throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
      }
      return result;  
  }
  

  @Post('login')  
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
      return await this.authService.login(loginUserDto);  
  }

  @Get('email/:email')
  @ApiBody({ description: 'email', required: true })
  async findByEmail(@Param() params): Promise<LoginStatus> {
    return await this.authService.refrechToken(params.email);
 
}

}
