import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CryptoTestDto {
  @ApiProperty({
    example: '1234512345',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
