import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import swaggerConfig from './config/swagger.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000;
  swaggerConfig(app);

  await app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}
bootstrap();
