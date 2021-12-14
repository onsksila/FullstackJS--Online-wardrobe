
import { ObjectID } from "typeorm";

export interface LoginStatus {
    _id: ObjectID;
    email: string;
    name:string;
    gender:string;
    measures:boolean;
    quiz:boolean;
    accessToken: any;
    payld: any;
  }