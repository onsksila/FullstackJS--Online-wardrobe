import { CacheInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ClothesModule } from './modules/clothes/clothes.module';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { MeasurementModule } from './modules/measurement/measurement.module';
import { ClothTasteModule } from './modules/cloth-taste/cloth-taste.module';
import { DataScrappingModule } from './modules/data-scrapping/data-scrapping.module';



@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true
  }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //     host: process.env.DB_HOST,
    //     database: process.env.DB_NAME,
    //     entities: [join(__dirname, '**/entities/**.entity{.ts,.js}')],
    //     synchronize: true,
    //     logger: 'advanced-console',
    //     useUnifiedTopology: true
    // },),


    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.BASE_URL,
        entities: [join(__dirname, '**/entities/**.entity{.ts,.js}')],
        synchronize: true,
        logger: 'advanced-console',
        useUnifiedTopology: true
    },),

    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: true, // use SSL true or false
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_API_KEY
        }
      },
      template: {
        dir: join(__dirname, '..', 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter if you're using .pug files
        options: {
          strict: true
        }
      }
    }),
    UserModule, AuthModule, ClothesModule, MeasurementModule, ClothTasteModule,DataScrappingModule],
  controllers: [AppController],
  
  /*providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    },
    AppService
  ],
})*/
  providers: [AppService],})

export class AppModule {}
