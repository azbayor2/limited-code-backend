import { Controller, Post, Body } from '@nestjs/common';
import { EmailVerificationService } from './emailVerification.service';
import { EmailDto, EmailVerifyDto } from './email.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auths')
@Controller('/auth')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @ApiOperation({
    description: '이메일 인증번호를 전송합니다',
  })
  @Post('/send')
  async sendCode(@Body() emailDto: EmailDto) {
    return {
      message: (await this.emailVerificationService.sendCode(emailDto))
        ? true
        : false,
    };
  }
  @ApiOperation({
    description: '이메일 인증번호를 검증합니다',
  })
  @Post('/verify')
  async verifyCode(@Body() emailVerifyDto: EmailVerifyDto) {
    return {
      message: (await this.emailVerificationService.verifyCode(emailVerifyDto))
        ? true
        : false,
    };
  }
}
