import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import config from './config/configuration';
import { ValidatorModule } from './validator/validator.module';
import { HealthModule } from './health/health.module';
import { CryptoModule } from './crypto/crypto.module';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BusinessExceptionFilter } from './exception/BusinessException.filter';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfigFactory } from './mailer/mailer.config';
import { JobModule } from './job/job.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { MailerModule as CustomMailerModule } from './mailer/mailer.module';

const isProd = process.env.NODE_ENV === 'production' || false;

/** 환경과 상관없이 추가할 모듈 추가 */
const modules = [
  DatabaseModule,
  ValidatorModule,
  HealthModule,
  CryptoModule,
  AuthModule,
  UserModule,
  MailerModule,
  JobModule,
  SchedulerModule,
  CustomMailerModule,
];

/** test 환경에서만 활성화 할 모듈들만 추가 */
if (!isProd) {
  modules.push(TestModule);
}

@Module({
  imports: [
    /** 전역 변수 설정 */
    ConfigModule.forRoot({
      // configuration
      load: [config],
      isGlobal: true,
    }),

    /** scheduler */
    ScheduleModule.forRoot(),

    /** node mailer */
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: MailerConfigFactory,
    }),

    /** 나머지 모듈 */
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
