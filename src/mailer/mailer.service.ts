import { Injectable } from '@nestjs/common';
import { MailerBatchService } from '@nestjs-modules/mailer';
import { Job } from 'src/job/entity/Job.entity';
import { SendEmailMeta } from 'src/job/meta.type';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class MailerService {
  constructor(
    private readonly mailerService: MailerBatchService,
    private readonly sequelize: Sequelize,
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
  }
}
