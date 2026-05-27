import { InjectModel } from '@nestjs/sequelize';
import { EmailVerification } from './entity/EmailVerification.entity';
import { EmailVerification as EmailVerificationDto } from './email.type';
import { Email } from './email.type';
import { CryptoService } from 'src/crypto/crypto.service';
import { Sequelize } from 'sequelize';

export class EmailVerificationService {
  constructor(
    @InjectModel(EmailVerification)
    private readonly emailVerificationRepository: typeof EmailVerification,
    private readonly cryptoService: CryptoService,
  ) {}

  /** 스케줄러에 이메일 전송 job을 푸시하고, 새로운 튜플을 만든다 */
  async sendCode({ email }: Email) {
    const code = this.cryptoService.generateVerificationCode();

    /** 추후 스케줄러 구현 예정 */

    /** 스케줄러 구현 후 스케줄러 삽입 확인 */

    const query = await this.emailVerificationRepository.create({
      email,
      verificationCode: code,
    });

    if (query) return true;
    return false;
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
    if (!savedVerification) return false;

    const savedCode = savedVerification?.verificationCode;

    if (savedCode !== emailVerification.code) return false;

    /** 인증이 되었으므로 verified = true 로 설정 */
    savedVerification.verified = true;
    await savedVerification.save();

    return true;
  }
}
