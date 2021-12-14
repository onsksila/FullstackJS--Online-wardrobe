import { NestMiddleware, Injectable } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { IGetUserAuthInfoRequest } from '../../../shared/user-request.interface';
import { throwError } from '../../../shared/throw-error.utils';
import { UserService } from '../user.service';
import { SECRET } from '../../../config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    // get token from bearer token
    const token = req.headers?.authorization?.split(' ')[1];
    if (token) {
      try {
        const { email } = jwt.verify(token, SECRET);

        // throws Error if user not found
        const user = await this.userService.findByEmail(email);

        // set populated user in request
        req.user = user;
        next();
      } catch (error) {
        if (error.name === 'TokenExpiredError') throwError({ user: 'Invalid Token' }, 'Token Expired', 401);
        throwError({ user: 'Invalid Token' }, 'Invalid Token', 401);
      }
    } else throwError({ user: 'Not Authorized' }, 'Unauthorized', 401);
  }
}
