import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { EmailVerification } from 'src/auth/entity/EmailVerification.entity';
import { Job } from 'src/job/entity/Job.entity';
import { JobType } from 'src/job/entity/JobType.entity';
import { User } from 'src/user/entity/User.entity';

/** 여기에 사용하는 모든 모델 정의하기 */
const models = [User, EmailVerification, Job, JobType];

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
  models,
  define: { timestamps: false },
});
