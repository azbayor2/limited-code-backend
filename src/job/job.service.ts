import { Inject, Injectable, Logger } from '@nestjs/common';
import { Job } from './entity/Job.entity';
import { JobType } from './entity/JobType.entity';

@Injectable()
export class JobService {
  private readonly logger = new Logger('JobService');
  constructor(
    @Inject(Job) private readonly jobRepository: typeof Job,
    @Inject(JobType) private readonly jobTypeRepository: typeof JobType,
  ) {}

  /** 작업별로 처리할 것들을 함수로 정의 후 스케줄러 서비스에 등록하기 */

  async handleEmail() {
    const { rows, count } = await this.jobRepository.findAndCountAll({
      where: {
        status: 'PENDING',
      },
      include: [
        {
          model: JobType,
          as: 'jobType',
          where: { jobName: 'SendEmail' },
          required: true,
        },
      ],
    });

    /** 실행할 작업이 없으면 리턴함 */
    if (count === 0) return;

    this.logger.log('Handle Email Job Started');

    // 실행 함수 넣기
    this.logger.log('Handle Email Job Completed');

    return;
  }
}
