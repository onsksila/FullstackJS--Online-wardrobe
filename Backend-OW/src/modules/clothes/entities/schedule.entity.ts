import { Entity, Column, ObjectIdColumn, Index, Unique, BeforeInsert } from 'typeorm';
import { Transform,Type } from 'class-transformer';
import { ObjectID } from 'mongodb';



import { transformEntity } from 'src/shared/transformEntity.utlis';



 @Entity('schedule')
export class Schedule {
   
  @Transform(transformEntity)
    @ObjectIdColumn()
    _id: ObjectID;
 

    @Column()
    monday: string;

    @Column()
    tuesday: string;

    
    @Column()
    wednesday: string;

    @Column()
    thursday: string;
   
    @Column()
    friday: string;

    @Column()
    saturday: string;

    @Column()
    sunday: string;

    @Column()
    user : ObjectID;

 


}
