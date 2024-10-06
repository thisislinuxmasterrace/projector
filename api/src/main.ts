import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  SwaggerModule.setup(
    'api/documentation',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('projector api')
        .setDescription(
          'a server side of an open source project management system focused on simplicity',
        )
        .addBearerAuth()
        .setVersion('0.1.0')
        .build(),
    ),
  );

  app.enableCors({
    origin: `*`,
    credentials: true,
    methods: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
