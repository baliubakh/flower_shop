import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'https://flower-shop-liard.vercel.app',
      credentials: true,
    },
  });
  app.setGlobalPrefix('api');

  app.use(helmet());
  app.use(cookieParser());

  await app.listen(process.env.PORT);
}
bootstrap();
