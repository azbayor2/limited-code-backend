import { Inject, Injectable, Logger } from '@nestjs/common';
import { Job } from './entity/Job.entity';
import { JobType } from './entity/JobType.entity';
import { EmailVerification } from 'src/auth/entity/EmailVerification.entity';
import { Op, Transaction } from 'sequelize';
import {
  BusinessErrorCode,
  BusinessException,
} from 'src/exception/BusinessException.type';
import { SendEmailMeta } from './meta.type';
import { JobTypeEnum } from './job.type';
import { MailerService } from '../mailer/mailer.service';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class JobService {
  private readonly logger = new Logger('JobService');
  constructor(
    @InjectModel(Job) private readonly jobRepository: typeof Job,
    @InjectModel(JobType) private readonly jobTypeRepository: typeof JobType,
    @Inject(MailerService) private readonly mailerService: MailerService,
  ) {}

  /** 작업별로 처리할 것들을 함수로 정의 후 스케줄러 서비스에 등록하기 */

  /** 이메일 인증번호 보내기를 실행한다 (스케줄러에서 호출) */
  async handleEmail() {
    const { rows, count } = await this.jobRepository.findAndCountAll({
      where: {
        status: { [Op.or]: ['PENDING', 'FAILED'] },
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

    /** 이메일 전송하는 헬퍼 함수 실행 */
    await this.mailerService.bulkSendEmail(rows);

    this.logger.log('Handle Email Job Completed');

    return;
  }

  /*********************  헬퍼 함수 */
  /******* 밑에는 job의 헬퍼 함수를 저장 */

  /** 이메일을 전송하는 Job을 만든다 */
  async createEmailAuth(emailAuth: EmailVerification, t: Transaction) {
    if (!emailAuth)
      throw new BusinessException(BusinessErrorCode.UNKNOWN_ERROR);

    /** Job에 저장할 메타데이터 추가 */
    const meta: SendEmailMeta = {
      email: emailAuth.email,
      code: emailAuth.verificationCode,
      mailVerifiationId: emailAuth.id,
    };

    /** SendMail의 ID 값을 조회함. */
    const jobTypeEntity = await this.jobTypeRepository.findOne({
      where: {
        jobName: JobTypeEnum.SEND_EMAIL,
      },
    });

    if (!jobTypeEntity)
      throw new BusinessException(BusinessErrorCode.UNKNOWN_ERROR);

    const jobTypeId = jobTypeEntity.id;

    /** 새로운 작업 생성 (트랜잭션으로 묶여있음을 참고) */
    await this.jobRepository.create(
      {
        jobTypeId,
        meta,
      },
      { transaction: t },
    );

    return;
  }
}
