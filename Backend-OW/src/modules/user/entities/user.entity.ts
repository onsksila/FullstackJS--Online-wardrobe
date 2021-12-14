import { Entity, Column, ObjectIdColumn, Index, Unique, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Transform,Type } from 'class-transformer';
import { ObjectID } from 'mongodb';
import * as bcrypt from 'bcrypt';

import { IsArray, IsEmail } from 'class-validator';
import { transformEntity } from 'src/shared/transformEntity.utlis';


enum Gender {
    Man = 'man',
    Woman = 'woman',
}

@Entity('user')
export class User {
    @Transform(transformEntity)
    @ObjectIdColumn()
    _id: ObjectID;
 
    @Column()
    name: string;

    /*@Column()
    @Index({ unique: true })
    username: string;*/

    @Column()
    @IsEmail()
    @Index({ unique: true })
    email: string;

    @Column()
    password: string;

    
  @Column()
  @Transform(transformEntity)
  userUpdated: ObjectID | User;

  @Column()
  resetPasswordToken?: string;

    @Column()
    date: Date;

    
  @Column("enum", { enum: Gender })
  gender: Gender;

    @Column()
    image: string;


   
    @Column()
    quiz:boolean;

    @Column()
    measures:boolean;

    @BeforeInsert()  async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

   

}

