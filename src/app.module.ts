import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import config from './config/configuration';
import { ValidatorModule } from './validator/validator.module';
import { HealthModule } from './health/health.module';
import { CryptoModule } from './crypto/crypto.module';
import { TestModule } from './test/test.module';

const isProd = process.env.NODE_ENV === 'production' || false;

/** 환경과 상관없이 추가할 모듈 추가 */
const modules = [DatabaseModule, ValidatorModule, HealthModule, CryptoModule];

/** test 환경에서만 활성화 할 모듈들만 추가 */
if (!isProd) {
  modules.push(TestModule);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
