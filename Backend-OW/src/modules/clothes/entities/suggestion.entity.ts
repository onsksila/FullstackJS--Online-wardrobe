import { Entity, Column, ObjectIdColumn, Index, Unique, BeforeInsert } from 'typeorm';
import { Transform,Type } from 'class-transformer';
import { ObjectID } from 'mongodb';



import { transformEntity } from 'src/shared/transformEntity.utlis';



 @Entity('suggestion')
export class Suggestion {

  constructor(imageOne: string,imageTow: string,imageThree: string,User : ObjectID,fromUser:boolean){
    this.imageOne = imageOne;
    this.imageTow = imageTow;
    this.imageThree = imageThree;
    this.User= User;
    this.fromUser=fromUser;
 }
   
  @Transform(transformEntity)
    @ObjectIdColumn()
    _id: ObjectID;
 

    @Column()
    imageOne: string;

    @Column()
    imageTow: string;

    @Column()
    imageThree: string;

    @Column()
    dateSug: String;

    @Column()
    style: string;

    @Column()
    fromUser: boolean;

    @Column()
    User : ObjectID;

    @BeforeInsert()
     private beforeInsertActions() {
      var today = new Date();
      var dd = String(today. getDate()). padStart(2, '0');
      var mm = String(today. getMonth() + 1). padStart(2, '0'); //January is 0!
      var yyyy = today. getFullYear();
      ​
      this.dateSug = mm + '/' + dd + '/' + yyyy;
  }


}
