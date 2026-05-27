import { Controller, Post } from '@nestjs/common';
import { EmailVerificationService } from './emailVerification.service';
import { EmailDto } from './email.dto';

@Controller('/auth')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Post('/send')
  async sendCode(@Body() emailDto: EmailDto) {
    return {
      message: (await this.emailVerificationService.sendCode(emailDto))
        ? true
        : false,
    };
  }
}
