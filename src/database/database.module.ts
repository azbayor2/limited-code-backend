import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './configuration';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: sequelizeConfig,
    }),
  ],
})
export class DatabaseModule {}
