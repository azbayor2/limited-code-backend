import { Controller, Post, Body } from '@nestjs/common';
import { EmailVerificationService } from './emailVerification.service';
import { EmailDto, EmailVerifyDto, EmailVerifyReturnDto } from './email.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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

  @ApiResponse({
    description: '반환 형식',
    type: EmailVerifyReturnDto,
  })
  @ApiOperation({
    description: '이메일 인증번호를 검증합니다',
  })
  @Post('/verify')
  async verifyCode(@Body() emailVerifyDto: EmailVerifyDto) {
    return await this.emailVerificationService.verifyCode(emailVerifyDto);
  }
}
