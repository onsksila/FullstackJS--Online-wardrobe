//export interface JwtPayload {  email: string;}
import { ObjectID } from 'mongodb';
export interface JwtPayload {  _id: ObjectID; email: string; name:string ;gender:string ;date: Date; measures:boolean;quiz:boolean}