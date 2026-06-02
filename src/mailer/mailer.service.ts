import { Injectable } from '@nestjs/common';
import { MailerBatchService } from '@nestjs-modules/mailer';
import { Job } from 'src/job/entity/Job.entity';
import { SendEmailMeta } from 'src/job/meta.type';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Sequelize } from 'sequelize-typescript';
import { EmailVerification } from 'src/auth/entity/EmailVerification.entity';
import { Logger } from '@nestjs/common';
import {
  BusinessErrorCode,
  BusinessException,
} from 'src/exception/BusinessException.type';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MailerService {
  private readonly logger = new Logger('MailerService');
  constructor(
    private readonly mailerService: MailerBatchService,
    private readonly sequelize: Sequelize,
    @InjectModel(EmailVerification)
    private readonly emailVerificationRepo: typeof EmailVerification,
  ) {}

  async bulkSendEmail(toSend: Job[]) {
    const sent = await this.mailerService.sendBatch({
      messages: toSend.map((j): ISendMailOptions => {
        const meta = j.meta as SendEmailMeta;

        return {
          to: meta.email,
          subject: '인증번호 입니다',
          template: 'emailAuthTemplate2',
          context: {
            authenticationCode: meta.code,
          },
        };
      }),
    });

    const result = sent.results;

    /** 각 result 별로 성공, 실패 나누고, transaction을 생성하고, 배치로 처리하기 (알고리즘 생각)*/

    await Promise.allSettled(
      result.map(async (r) => {
        const t = await this.sequelize.transaction();

        const index = r.index;

        /** 해당 Job을 찾기 */
        const j = toSend[index];

        /** 임시, 머지하기 전에 로깅 클래스 수정하기 */
        try {
          if (!j)
            throw new BusinessException(
              BusinessErrorCode.UNKNOWN_ERROR,
              'The job related to Email not found',
            );

          /** Job에 저장되어 있는 메타 데이터 추출 */
          const meta = j.meta as SendEmailMeta;

          /** 성공했으면 */
          if (r.success) {
            j.status = 'SUCCESS';

            /** Job과 연결된 EmailVerification 필드를 하나 찾음 */
            const emailAuth = await this.emailVerificationRepo.findOne({
              where: {
                id: meta.mailVerifiationId,
              },
            });

            if (!emailAuth)
              throw new BusinessException(
                BusinessErrorCode.EMAIL_VERIFICATION_DATA_NOT_FOUND,
              );

            emailAuth.sent = true;
            await j.save({ transaction: t });
            await emailAuth.save({ transaction: t });
          } else {
            /** 실패했으면 */
            j.status = 'FAILED';
            this.logger.error(
              BusinessErrorCode.UNKNOWN_ERROR,
              'EmailVerificaion, Job 업데이트 실패',
            );
            await j.save({ transaction: t });
          }

          await t.commit();
        } catch (e) {
          await t.rollback();
          if (e instanceof BusinessException)
            this.logger.log(e.message, e.stack);
        }
      }),
    );
  }
}
