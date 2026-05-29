import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import e from 'express';
import { JobService } from 'src/job/job.service';

@Injectable()
export class SchedulerService {
  constructor(private readonly jobService: JobService) {}

  @Cron('0 * * * * *')
  async handleCron() {
    await this.jobService.handleEmail();
  }
}
