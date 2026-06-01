import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JobService } from 'src/job/job.service';

@Injectable()
export class SchedulerService {
  constructor(private readonly jobService: JobService) {}

  @Cron('0 * * * * *')
  async handleCron() {
    /** 이메일 인증번호를 보낼것이 있는지 확인. */
    await this.jobService.handleEmail();
  }
}
