import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import config from './config/configuration';
import { ValidatorModule } from './validator/validator.module';
import { HealthModule } from './health/health.module';
import { CryptoModule } from './crypto/crypto.module';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BusinessException } from './exception/BusinessException.type';
import { BusinessExceptionFilter } from './exception/BusinessException.filter';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

const isProd = process.env.NODE_ENV === 'production' || false;

/** 환경과 상관없이 추가할 모듈 추가 */
const modules = [
  DatabaseModule,
  ValidatorModule,
  HealthModule,
  CryptoModule,
  AuthModule,
  UserModule,
];

/** test 환경에서만 활성화 할 모듈들만 추가 */
if (!isProd) {
  modules.push(TestModule);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      // configuration
      load: [config],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(), // scheduler
    ...modules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: BusinessExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule {}
