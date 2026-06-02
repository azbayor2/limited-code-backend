import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EmailDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: '이메일을 입력하세요',
    required: true,
  })
  @IsString()
  email: string;
}

export class EmailVerifyDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: '이메일을 입력하세요',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '123456',
    description: '인증번호를 입력하세요',
    required: true,
  })
  @IsString()
  code: string;
}

export class EmailVerifyReturnDto {
  @ApiProperty({
    example: 1,
    description: 'emailVerificationId 값을 반환합니다 (false 일 시 미반환)',
    required: false,
  })
  emailVerificationId: number;

  @ApiProperty({
    example: true,
    description: '인증 성공 여부를 반환합니다',
    required: true,
  })
  status: boolean;
}
