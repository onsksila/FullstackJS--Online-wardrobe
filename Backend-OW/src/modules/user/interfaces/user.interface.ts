import { ObjectID } from 'mongodb';

export interface IUser {
  _id: ObjectID;
  name: string;
  email: string;
 
  resetPasswordToken?: string;
  image?: string;
}
export interface IUserLogin extends IUser {
  token: string;
}

export interface UserPop {
  user: IUser;
}
