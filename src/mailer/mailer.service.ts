import { Inject, Injectable } from '@nestjs/common';
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
          template: 'emailAuthTemplate',
          context: {
            authenticationCode: meta.code,
          },
        };
      }),
    });

    const result = sent.results;

    /** 각 result 별로 성공, 실패 나누고, transaction을 생성하고, 배치로 처리하기 (알고리즘 생각)*/

    await Promise.all(
      result.map(async (r) => {
        const t = await this.sequelize.transaction();

        const sent = r.result as ISendMailOptions;
        const to = sent.to;

        /** 해당 Job을 찾기 */
        const j = toSend.find((send) => {
          const meta = send.meta as SendEmailMeta;
          return meta.email === to;
        });

        /** 임시, 머지하기 전에 로깅 클래스 수정하기 */
        try {
          if (!j)
            throw new BusinessException(BusinessErrorCode.EMAIL_SENT_FAILED);

          /** 나중에 emailVerification에 전송되었는지 여부를 저장하는 필드 추가하기 */
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
            await j.save({ transaction: t });
          }

          await t.commit();
        } catch (e) {
          await t.rollback();
          if (e instanceof BusinessException)
            this.logger.log(e.message, e.stack);
        }

        return t.commit();
      }),
    );
  }
}
