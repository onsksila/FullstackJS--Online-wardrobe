import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { join } from 'path';
async function bootstrap() {


  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: {"origin": "*", "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",}});//enlever le probleme de cors
  //app.setGlobalPrefix('api'); si on veut faire /api/users route global de l'application

  const options = new DocumentBuilder()
    .setTitle('Products shop back-end')
    .setDescription('Back-end for products shop workshop')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
    extensions: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx']
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);


}
bootstrap();
