import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindUserArgs {
  @ApiProperty({
    example: 1,
    description: '사용자 id를 입력합니다 (pk)',
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @ApiProperty({
    example: 'example@gmail.com',
    description: '이메일을 입력합니다',
    required: false,
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'username',
    description: '사용자 username을 입력합니다',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string | undefined;
}

export class CheckUserExists {
  @ApiProperty({
    example: 'example@gmail.com',
    description: '이메일을 입력합니다',
    required: false,
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'username',
    description: '사용자 username을 입력합니다',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;
}
