import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filters';
import serverConfig from 'src/common/config/server';
import * as dotenv from 'dotenv';
dotenv.config();

const port = serverConfig.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: serverConfig.CORS_ORIGINS,
    exposedHeaders: ['X-Total-Count'],
  });
  console.log('server running on port: ', port);
  console.log('corsOrigin: ', serverConfig.CORS_ORIGINS);
  console.log('env: ', process.env.NODE_ENV);
  await app.listen(port);
}
bootstrap();
