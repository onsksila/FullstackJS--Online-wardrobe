
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cleaner } from 'src/shared/file-cleaner.utils';
import { findByField } from 'src/shared/findByField.utils';
import { Repository,ObjectID, DeleteResult } from 'typeorm';
import { ClothTaste } from '../cloth-taste/entities/cloth-taste.entity';

import { CreateClothesDto } from './dto/create-clothes.dto';
import { CreateScheduleDto } from './dto/create-schedule.tdo';
import { UpdateClothesDto } from './dto/update-clothes.dto';
import { UpdateScheduleDto } from './dto/update-schedule.tdo';
import { Clothes } from './entities/clothes.entity';
import { Schedule } from './entities/schedule.entity';
import { Suggestion } from './entities/suggestion.entity';
import { SugestionStatus } from './Interfaces/SugestionStatus';
import { SuggClientStatus } from './Interfaces/suggClientStatues';


@Injectable({ scope: Scope.REQUEST })
export class ClothesService {

  constructor(
    @InjectRepository(Clothes)
    
    private readonly clothesRepository: Repository<Clothes>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Suggestion)
    private readonly suggestionRepository: Repository<Suggestion>,
    @InjectRepository(ClothTaste)
    private readonly clothTasteRepository: Repository<ClothTaste>,
  ) {}

  
  async create(dto: CreateClothesDto): Promise<Clothes> {
    const newClothes = Object.assign(new Clothes(), dto);
    return await this.clothesRepository.save(newClothes);
  }

  async findAll(): Promise<Clothes[]> {
    return await this.clothesRepository.find();
  }

  async findOneById(_id: ObjectID):Promise<Clothes> {
    // console.log(_id+"//////"+this.UserRepository.findOne({ _id }))
     const tofind = await findByField(this.clothesRepository, { _id }, true);
     console.log(tofind._id)
     return await tofind
   }

async findClothesByUser(User: ObjectID):Promise<Clothes[]> {
  ///console.log('eeeeee')
    
   const find= await this.clothesRepository.find({where:{"User":{$eq:User}}})
    
     return await find
   }




  async update(toUpdate: Clothes, dto: UpdateClothesDto): Promise<Clothes> {
    if (dto.image && toUpdate.image !== dto.image) {
      cleaner(toUpdate.image);
    }
    Object.assign(toUpdate, dto);
    return await this.clothesRepository.save(toUpdate);
  }

  async delete(_id: ObjectID): Promise<DeleteResult> {
    const toDelete = await findByField(this.clothesRepository, { _id }, true);
    if (toDelete?.image) {
      cleaner(toDelete.image);
    }
    return await this.clothesRepository.delete({ _id });
  }


  
  ///////////schedule

  //create Schedule 
  async createSchedule(dto: CreateScheduleDto): Promise<Schedule> {
    console.log("service : "+dto)
  const newSchedule = Object.assign(new Schedule(), dto);
  console.log("newSchedule " + newSchedule);
  return await this.scheduleRepository.save(newSchedule);
}

 //affichage Planning
 async getSchedule(user: ObjectID):Promise<Schedule>{
  const find= await this.scheduleRepository.findOne({where:{"user":{$eq:user}}})
  return await find;
}

//update Planning
  async updateSchedule(toUpdate: Schedule, dto: UpdateScheduleDto): Promise<Schedule> {
    Object.assign(toUpdate, dto);
    return await this.scheduleRepository.save(toUpdate);
  }

  ///////////suggestion
  async findAleatoir(user: ObjectID | string):Promise<SugestionStatus>{

    var today = new Date();
    var dd = String(today. getDate()). padStart(2, '0');
    var mm = String(today. getMonth() + 1). padStart(2, '0'); //January is 0!
    var yyyy = today. getFullYear() ;
     
    var tast = '' // tast form tastUser db 
    var activity = '' // activity from schedule db 
    var day ='';// day of week 
   const dateSugg =  mm + '/' + dd + '/' + yyyy;

   var season = "";
  var style = "";
// get day of week 
  switch (new Date().getDay()) {
    case 0:
      day = "sunday";
      break;
    case 1:
      day = "monday";
      break;
    case 2:
      day = "tuesday";
      break;
    case 3:
      day = "wednesday";
      break;
    case 4:
      day = "thursday";
      break;
    case 5:
      day = "friday";
      break;
    case 6:
      day = "saturday";
  }
    


   const sugg = await this.suggestionRepository.findOne({where:{"User":{$eq:user},"dateSug":dateSugg,'fromUser':false}});
   const clothExist = await this.clothesRepository.find({where:{"User":{$eq:user}}});

   var count = clothExist.length;

   console.log('nb cloths : ' + count);

   const SuggByDay = await this.scheduleRepository.findOne({where:{"user":{$eq:user}}});
  
    
   if(SuggByDay){
     if(count != 0 ){
      if(!sugg ){// new Suggestion
        // get day of week
        
        //get season by mounth
        if( (mm === '12') || (mm === '01') || (mm === '02') ){
          season = "winter"
       }
       if( (mm === '03') || (mm === '04') || (mm === '05') ){
         season = "spring"
       }
       if( (mm === '06') || (mm === '07') || (mm === '08') ){
         season = "summer"
       }
       if( (mm === '09') || (mm === '10') || (mm === '11') ){
         season = "autumn"
       }
         
        
            if(day === 'monday'){
              activity = SuggByDay.monday;
            }
            if(day === 'tuesday'){
              activity = SuggByDay.tuesday;
            }
            if(day === 'wednesday'){
              activity = SuggByDay.wednesday;
            }
            if(day === 'thursday'){
              activity = SuggByDay.thursday;
            }
            if(day === 'friday'){
              activity = SuggByDay.friday;
            }
            if(day === 'saturday'){
              activity = SuggByDay.saturday;
            }
            if(day === 'sunday'){
              activity = SuggByDay.sunday;
            }
          
  
          
  
          // get Cloth tast by activity 
          const styleUser = await this.clothTasteRepository.findOne(
            {where:{"user":{$eq:user}}}
          );
          console.log("activity user ***************" + styleUser.styleTast)
  
          if(activity === 'worck'){
            style=styleUser.workTast;
          }
          if(activity === 'party'){
            style=styleUser.partyTast;
          }
          if(activity === 'wedding'){
            style=styleUser.weddingTast;
          }
          if(activity === 'basicDay'){
            style=styleUser.styleTast;
          }
          
  
         //find from db
           const tofindOne = await this.clothesRepository.find({where:{"User":{$eq:user},"season":season,"style":style,"name":"t-shirt" }})
           const tofindTow = await this.clothesRepository.find({where:{"User":{$eq:user},"season":season,"style":style,"name":"pants" }})
           const tofindThree = await this.clothesRepository.find({where:{"User":{$eq:user},"season":season,"style":style,"name":"shoes" }})
        
         console.log(" t-chirt" +tofindOne);
         console.log(" pants " +tofindTow);
         console.log(" sheos" +tofindThree);

         var nbTchirt = tofindOne.length;
         var nbPants = tofindTow.length;
         var nbShose = tofindThree.length;

         console.log( "nb 1  : " + nbTchirt)
         console.log( "nb 2 : " + nbPants)
         console.log( "nb 3 : " + nbShose)

         var imageOne: string = '';
         var imageTow : string = '';
         var imageThree : string = '';
   
         var tshirt : Clothes = null;
         var pants : Clothes = null;
         var shoes : Clothes = null;

        if(nbTchirt != 0){
            tshirt = tofindOne[Math.floor(Math.random() * tofindOne.length)];
            imageOne = tshirt.image;
            console.log("ddddddddddddddddd"+tshirt.image)
        }
        if(nbPants != 0){
           pants = tofindTow[Math.floor(Math.random() * tofindTow.length)];
           imageTow = pants.image;
           console.log( "ddddddddddddddddd" +pants.image)
        }
        if(nbShose != 0){
          shoes = tofindThree[Math.floor(Math.random() * tofindThree.length)];
          imageThree = shoes.image;
          console.log("ddddddddddddddddd"+shoes.image)
        }
         // data random
           
           
          if(nbShose != 0 && nbPants != 0 && nbTchirt){
            const newSugg : Suggestion = new Suggestion(tshirt.image,pants.image,shoes.image,user,false); 
            await this.suggestionRepository.save(newSugg);
          }
            
         
          
           
           const sugestionStatus: SugestionStatus = {imageOne: imageOne,
                                                     imageTow: imageTow , 
                                                     imageThree: imageThree,
                                                     dayOfWeek : day};
                                                      
           return sugestionStatus;
       }
  
      
     else {
      const sugestionStatus: SugestionStatus = {imageOne: sugg.imageOne, 
                                                imageTow: sugg.imageTow , 
                                                imageThree: sugg.imageThree,
                                                dayOfWeek : day
                                              };
          return sugestionStatus;                                     
     }
     }
      else {
        return null
      }
   }
      else{
         return null;
      }
   

}



async createSuggclient(user: ObjectID | string , styleCl : string):Promise<SuggClientStatus>{
   
  var season = "";
  const style = styleCl;// from emploie
 console.log("rrrrrrrrrrrrrrrr" +styleCl)
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
 
if( (mm === '12') || (mm === '01') || (mm === '02') ){
 season = "winter"
}
if( (mm === '03') || (mm === '04') || (mm === '05') ){
season = "spring"
}
if( (mm === '06') || (mm === '07') || (mm === '08') ){
season = "summer"
}
if( (mm === '09') || (mm === '10') || (mm === '11') ){
season = "autumn"
}

  //find fro db
  const tofindOne = await this.clothesRepository.find({where:{"user":{$eq:user},"season":season,"style":style,"name":"t-shirt" }})
  const tofindTow = await this.clothesRepository.find({where:{"user":{$eq:user},"season":season,"style":style,"name":"pants" }})
  const tofindThree = await this.clothesRepository.find({where:{"user":{$eq:user},"season":season,"style":style,"name":"shoes" }})

// data random
  var tshirt = tofindOne[Math.floor(Math.random() * tofindOne.length)];
  var pants = tofindTow[Math.floor(Math.random() * tofindTow.length)];
  var shoes = tofindThree[Math.floor(Math.random() * tofindThree.length)];

  const newSugg : Suggestion = new Suggestion(tshirt.image,pants.image,shoes.image,user,true); 
       await this.suggestionRepository.save(newSugg);
  
  
  const sugestionStatus: SuggClientStatus = {imageOne: tshirt.image, imageTow: pants.image , imageThree: shoes.image};
     
  return sugestionStatus;
}

}
