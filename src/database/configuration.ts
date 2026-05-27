import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from 'src/user/entity/user.entity';

export const sequelizeConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => ({
  dialect: 'mysql',
  host: configService.get('test.database.host'),
  port: configService.get('test.database.port'),
  username: configService.get('test.database.username'),
  password: configService.get('test.database.password'),
  database: configService.get('test.database.database'),
  // autoLoadModels: true,
  synchronize: false, // migration은 따로 관리
  models: [User],
  define: { timestamps: false },
});
