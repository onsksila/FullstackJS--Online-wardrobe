import { Entity, Column, ObjectIdColumn, Index, Unique, BeforeInsert } from 'typeorm';
import { Transform,Type } from 'class-transformer';
import { ObjectID } from 'mongodb';

import { transformEntity } from 'src/shared/transformEntity.utlis';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('cloth_taste')
export class ClothTaste {

    @Transform(transformEntity)
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    colorTast:string;

    @Column()
    styleTast:string;

    @Column()
    partyTast:string;

    @Column()
    weddingTast:string;

    @Column()
    shoesTast:string;

    @Column()
    workTast:string;

    @Column()
    @Index({ unique: true })
    createdAt: Date;
    
    @Column()
    accessoirTast:string;

    @ObjectIdColumn()
    @Transform(transformEntity)
    user : ObjectID | User;


    @BeforeInsert()
    private beforeInsertActions() {
   this.createdAt = new Date();
 }

}
