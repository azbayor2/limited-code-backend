import { Controller, Post, Body } from '@nestjs/common';
import { EmailVerificationService } from './emailVerification.service';
import {
  EmailDto,
  EmailReturnDto,
  EmailVerifyDto,
  EmailVerifyReturnDto,
} from './auth.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auths')
@Controller('/auth')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @ApiOperation({
    description: '이메일 인증번호를 전송합니다',
  })
  @ApiCreatedResponse({
    description: '이메일이 전송됐을 때 응답을 반환합니다',
    type: EmailReturnDto,
  })
  @Post('/send')
  async sendCode(@Body() emailDto: EmailDto): Promise<EmailReturnDto> {
    return {
      success: (await this.emailVerificationService.sendCode(emailDto))
        ? true
        : false,
    };
  }

  @ApiCreatedResponse({
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
