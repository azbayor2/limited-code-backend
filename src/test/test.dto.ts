import { IsNotEmpty, IsNumber, isString, IsString } from 'class-validator';
import { Type } from 'class-transformer';
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

export class JwtSignTestDto {
  @ApiProperty({
    example: 1,
    description: '숫자를 입력합니다.',
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  id!: number;

  @ApiProperty({
    example: 'azbayor2',
    description: 'username을 입력합니다',
    required: true,
  })
  @IsString()
  username!: string;
}
