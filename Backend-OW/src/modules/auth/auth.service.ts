import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/modules/user/user.service';
import { JwtService }from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { UserDto } from 'src/modules/user/dto/user-tdo';
import {  LoginUserDto  }  from 'src/modules/user/dto/login-user-dto';
import {  RefrechTokenDto  }  from 'src/modules/user/dto/refrech-token-tdo';
import { LoginStatus } from './interfaces/login-status.interface';
import { jwtConstants } from './jwtConstants';
@Injectable()
export class AuthService {

  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService,  ) {}
 
  
  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
      let status: RegistrationStatus = {
          success: true,   
          message: 'user registered',
      };
      try {
          await this.usersService.create(userDto);
      } catch (err) {
          status = {
              success: false,        
              message: err,
          };    
      }
      return status;  
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);    
    if (!user) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
    }    
    return user;  
}


        private  _createToken({ _id,email, name, gender, date, measures,quiz }: UserDto):any {
    
   
            const user: JwtPayload = {_id, email, name, gender,date,measures,quiz};
               
                const  accessToken =  this.jwtService.sign(user,{ expiresIn: '3600s' });
              
               console.log(accessToken)
                return { 
                    expiresIn: jwtConstants.expiresIn, 
                    accessToken,    
                };
        
    
  
    
  
}
 
async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {    
    // find user in db    
    const user = await this.usersService.findByLogin(loginUserDto);
   //const payload = `${user.name}${user.username}`;
    //const  token = this.jwtService.signAsync(payload);
    
   //console.log("token"+token)
    
    // generate and sign token    
    const token = this._createToken(user);
   // console.log(token)
   
    return {
        _id: user._id, email:user.email , name: user.name , gender:user.gender,measures:user.measures,quiz:user.quiz, accessToken: token, payld: ""
    };  
}


async refrechToken(email : string | object): Promise<LoginStatus> {    
  
    const user = await this.usersService.findByEmail(email);
       
    const token = this._createToken(user);
  
   
    return {
        _id: user._id, email:user.email , name: user.name , gender:user.gender,measures:user.measures,quiz:user.quiz, accessToken: token, payld: ""
    };  
}

}