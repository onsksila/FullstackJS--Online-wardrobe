import { transformEntity } from "src/shared/transformEntity.utlis";
import { BeforeInsert, Column, Entity, Index, ObjectIdColumn } from "typeorm";
import { Transform,Type } from 'class-transformer';
import { IsEmail } from "class-validator";
import { User } from "src/modules/user/entities/user.entity";
import { ObjectID } from 'mongodb';
@Entity('Measurement')
export class Measurement {
    @Transform(transformEntity)
    @ObjectIdColumn()
    _id: ObjectID;
 
    @Column()
    lefthand: Number;

    
    @Column()
    leftleg: Number;
    
    @Column()
    righthand: Number;
    
    @Column()
    rightleg: Number;
    
    @Column()
    shoulder: Number;
    
    @Column()
    volume: Number;
    
    @Column()
    User :ObjectID; 
    
    @Column()
    @Index({ unique: true })
    createdAt: Date;

    @BeforeInsert()
     private beforeInsertActions() {
    this.createdAt = new Date();
  }

    
    }