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
