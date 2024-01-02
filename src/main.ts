import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filters';
import { EnvConfigService } from './modules/env-config/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(EnvConfigService).getWebServerConfig();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: config.origins,
    exposedHeaders: ['X-Total-Count'],
  });
  console.log('server running on port: ', config.port);
  console.log('corsOrigin: ', config.origins);
  console.log('env: ', process.env.NODE_ENV);
  await app.listen(config.port);
}
bootstrap();
