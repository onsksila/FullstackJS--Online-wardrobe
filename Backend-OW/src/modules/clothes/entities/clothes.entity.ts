import { Entity, Column, ObjectIdColumn, Index, Unique, BeforeInsert } from 'typeorm';
import { Transform,Type } from 'class-transformer';
import { ObjectID } from 'mongodb';


import { IsArray, IsEmail } from 'class-validator';
import { transformEntity } from 'src/shared/transformEntity.utlis';




@Entity('clothes')
export class Clothes {
    @Transform(transformEntity)
    @ObjectIdColumn()
    _id: ObjectID;
 

    @Column()
    image: string;

    @Column()
    name: string;

    
    @Column()
    season: string;

    @Column()
    color: string;

    @Column()
    @Index({ unique: true })
    createdAt: Date;

    @Column()
    style: string;

    @Column()
    User :ObjectID;
    
    @BeforeInsert()
  private beforeInsertActions() {
    this.createdAt = new Date();
  }


}