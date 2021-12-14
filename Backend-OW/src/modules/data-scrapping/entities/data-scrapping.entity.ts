import { Entity, Column, ObjectIdColumn, Index, Unique, BeforeInsert } from 'typeorm';
import { Transform,Type } from 'class-transformer';
import { ObjectID } from 'mongodb';

import { transformEntity } from 'src/shared/transformEntity.utlis';

   
@Entity('data-scraping')
export class DataScrapping {

    @Transform(transformEntity)
    @ObjectIdColumn()
    _id: ObjectID;
 
    @Column()
    title :string;

    @Column()
    price: String;
    
    @Column()
    image : string;

}
