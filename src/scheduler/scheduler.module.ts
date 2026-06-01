import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { JobModule } from 'src/job/job.module';

@Module({
  providers: [SchedulerService],
  imports: [JobModule],
})
export class SchedulerModule {}
