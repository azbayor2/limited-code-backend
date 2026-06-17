import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import swaggerConfig from './config/swagger.config';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerInstance } from './winston/winston.config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    /** 윈스턴 로거 적용 */
    logger: WinstonModule.createLogger({ instance: winstonLoggerInstance }),
  });

  app.setGlobalPrefix('/api');

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000;

  swaggerConfig(app);

  app.use(cookieParser());
  app.enableCors({
    origin: configService.get<[]>('origins'),
    credentials: true,
    exposedHeaders: ['Authorization'],
  });

  await app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

// eslint-disable-next-line
bootstrap();
