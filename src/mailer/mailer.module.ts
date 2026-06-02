import { MailerService } from './mailer.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmailVerification } from 'src/auth/entity/EmailVerification.entity';

@Module({
  providers: [MailerService],
  exports: [MailerService],
  imports: [SequelizeModule.forFeature([EmailVerification])],
})
export class MailerModule {}
