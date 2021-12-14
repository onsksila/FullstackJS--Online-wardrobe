import { Injectable, HttpException, HttpStatus, Scope, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user-tdo'
import { Repository,ObjectID, DeleteResult } from 'typeorm';
import { LoginUserDto } from './dto/login-user-dto';
import { comparePasswords } from 'src/shared/utils'; 
import { cleaner } from 'src/shared/file-cleaner.utils';
import { findByField } from 'src/shared/findByField.utils';
import * as jwt from 'jsonwebtoken';
import { throwError } from 'src/shared/throw-error.utils';
import { REQUEST } from '@nestjs/core';
import { IGetUserAuthInfoRequest } from 'src/shared/user-request.interface';
import { MailerService } from '@nest-modules/mailer';
import { jwtConstants } from '../auth/jwtConstants';
import { UpdateNewPasswordDto } from './dto/updateNewPassword-user.dto';
import { IUser } from './interfaces/user.interface';
@Injectable({ scope: Scope.REQUEST })
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(REQUEST) private readonly request: IGetUserAuthInfoRequest,
    private readonly mailerService: MailerService,
  ) {}


  
  async create(userDto: CreateUserDto): Promise<User> {
    const { name,email,password,date,gender,image,measures,quiz } = userDto;
   
    const userInDb = await this.userRepository.findOne({ 
      where: { email } 
    });
  if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);    
  }
  
  const newUser: User= await this.userRepository.create({ name, email ,password,date,gender,image,measures,quiz });
  await this.userRepository.save(newUser);
   
  //let prod: ObjectID[]=[];
    //newUser.prodref = prod;
    return await this.userRepository.save(newUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  /*findOne(id: number) {
    return `This action returns a #${id} user`;
  }*/

  async findOneById(_id: ObjectID):Promise<User> {
    // console.log(_id+"//////"+this.UserRepository.findOne({ _id }))
     const tofind = await findByField(this.userRepository, { _id }, true);
     console.log(tofind._id)
     return await tofind
   }



  
  /*update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }*/

  async update(toUpdate: User, dto: UpdateUserDto): Promise<User> {
    if (dto.image && toUpdate.image !== dto.image) {
      cleaner(toUpdate.image);
   }
    Object.assign(toUpdate, dto);
    return await this.userRepository.save(toUpdate);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOne(options?: object): Promise<UserDto> {
    const user =  await this.userRepository.findOne(options);    
    return user;  
}

async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {    
  const user = await this.userRepository.findOne({ where: { email } });
  
  if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
  }
  
  // compare passwords    
  const areEqual = await comparePasswords(user.password, password);
  
  if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
  }
  
  return user;  
}

async findByPayload({username }: any): Promise<UserDto> {
  return await this.findOne({ 
      where:  { username } });  
}

async search(keyword): Promise<User[]> {
  const reg = new RegExp(keyword, 'i');
  return await this.userRepository.find({
    where: {
      email: reg
    }
  });
}



async delete(_id: ObjectID): Promise<DeleteResult> {
  const toDelete = await findByField(this.userRepository, { _id }, true);
  if (toDelete?.image) {
    cleaner(toDelete.image);
  }
  return await this.userRepository.delete({ _id });
}


async forgotPassword(email: string): Promise<User> {
  // throws Error if user not found
  const user = await findByField(this.userRepository, { email }, true);
  const resetPasswordToken = this.generateResetPasswordJWT(user);
  user.resetPasswordToken = resetPasswordToken;
  user.userUpdated = user._id;
  return await this.userRepository.save(user);
}

generateResetPasswordJWT(user) {
  return jwt.sign(
    {
      email: user.email,
      username: user.username
    },
    jwtConstants.secret,
    { expiresIn:  '24h' }
  );



}

async sendResetPasswordEmail(user) {
  const reset_password = '24h';
  const browser_name = this.request.headers['user-agent'] ?? 'Unkown Device';
  const ip = this.request.ip ?? 'Unknow Ip';
  const hostname = this.request.hostname;
 // const action_url = process.env.RESET_PASSWORD_URL + user.resetPasswordToken;

  try {
    return await this.mailerService.sendMail({
     
      to: user.email,
      from: '"NO REPLY" <yasmine.mestiri@esprit.tn>',
      subject: 'Reset password ',
      template: 'reset', // The `.pug` or `.hbs` extension is appended automatically.
      context: {
        // Data to be sent to template engine.
        name: user.name,
        ip,
       // action_url,
        browser_name,
        reset_password,
        support_email: 'yasmine.mestiri@esprit.tn'
      }
    });
  } catch (error) {
    throwError({ Email: error.message }, 'An error occured while sending reset mail');
  }

  

}
async updateNewPassword(updateNewPasswordDto: UpdateNewPasswordDto): Promise<IUser> {
  const { token, password } = updateNewPasswordDto;
  
  
  const  jwtData= jwt.verify(token, jwtConstants.secret);
  const email = jwtData.email;
  const user = await findByField(this.userRepository, {email},true );
  console.log(user)
  console.log(email)
  console.log(token)
 // user.resetPasswordToken = (Math.floor(Math.random() * (9000000)) + 1000000).toString();
  if (user.email !== email || user.resetPasswordToken !== token)
  console.log("1")
    throwError({ user: 'Invalid Reset Password Token' }, 'Invalid Token', 301);

  user.password = password;
  user.resetPasswordToken = undefined;//(Math.floor(Math.random() * (9000000)) + 1000000).toString();
  console.log("2")
console.log(user.resetPasswordToken)
  return await this.userRepository.save(user);
} catch (error) {
  if (error.name === 'TokenExpiredError')
  console.log("3")
    throwError({ user: 'Invalid Reset Password Token' }, 'Reset Password Token Expired', 500);

  throwError({ user: 'Invalid Reset Password Token' }, 'Invalid Token', 400);
}


/**
   * Find user by email
   * @param email to search (unique index)
   * @throws Error if user not found
   * @returns {IUser} populated user
   */
 async findByEmail(email: string | object): Promise<UserDto> {
  // throws error 404 if not found
  const user = await findByField(this.userRepository, { email }, true);

  return user;
}
  
}




