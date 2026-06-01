import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Job } from './entity/Job.entity';
import { JobType } from './entity/JobType.entity';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  providers: [JobService],
  exports: [JobService],
  imports: [MailerModule, SequelizeModule.forFeature([Job, JobType])],
})
export class JobModule {}
