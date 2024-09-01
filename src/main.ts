import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import * as morgan from 'morgan';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(morgan('dev'));

  await app.listen(process.env.PORT);
}
bootstrap();
