import { InjectModel } from '@nestjs/sequelize';
import { EmailVerification } from './entity/EmailVerification.entity';
import { EmailVerification as EmailVerificationDto } from './email.type';
import { Email } from './email.type';
import { CryptoService } from 'src/crypto/crypto.service';
import { JobService } from 'src/job/job.service';
import { Sequelize } from 'sequelize-typescript';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailVerificationService {
  private readonly logger = new Logger('EmailVerificationService');
  constructor(
    @InjectModel(EmailVerification)
    private readonly emailVerificationRepository: typeof EmailVerification,
    private readonly cryptoService: CryptoService,
    private readonly jobService: JobService,
    private readonly sequelize: Sequelize,
  ) {}

  /** 스케줄러에 이메일 전송 job을 푸시하고, 새로운 튜플을 만든다 */
  async sendCode({ email }: Email) {
    const code = this.cryptoService.generateVerificationCode();

    const t = await this.sequelize.transaction();

    /** 이메일 인증번호 저장하기 */
    const query = await this.emailVerificationRepository.create(
      {
        email: email,
        verificationCode: code,
      },
      { transaction: t },
    );

    /** 스케줄러에 작업 등록 */
    await this.jobService.createEmailAuth(query, t);

    try {
      await t.commit();
      return true;
    } catch (e) {
      await t.rollback();
      this.logger.error('error', e);
      return false;
    }
  }

  /** 인증번호 검증하기 */
  async verifyCode(emailVerification: EmailVerificationDto) {
    const savedVerification = await this.emailVerificationRepository.findOne({
      where: {
        email: emailVerification.email,
        verified: false,
      },
      order: [['createdAt', 'desc']],
      limit: 1,
    });
    /** 예외 클래스 만들면 제대로 처리하기 */

    if (!savedVerification) {
      return false;
    }

    console.log(savedVerification.verificationCode);
    const savedCode = savedVerification.verificationCode;

    if (savedCode !== emailVerification.code) return false;

    /** 인증이 되었으므로 verified = true 로 설정 */
    savedVerification.verified = true;
    await savedVerification.save();

    return true;
  }
}
