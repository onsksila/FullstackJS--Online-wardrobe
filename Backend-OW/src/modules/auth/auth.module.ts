import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'
import { jwtConstants } from './jwtConstants';
@Module({
  imports: [    
    UserModule,    
    PassportModule.register({
        defaultStrategy: 'jwt',
        property: 'user',
        session: false,
    }),
    JwtModule.register({
        secret: jwtConstants.secret, signOptions: {
            expiresIn: process.env.EXPIRESIN,
        },
    }),
], 
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
    PassportModule, 
    JwtModule
],
})
export class AuthModule {}
