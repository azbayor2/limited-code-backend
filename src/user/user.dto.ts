import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

/** 사용자 정보 검색 api */
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
  username?: string;
}

export class UserResponseInfo {
  @ApiProperty({
    description: 'pk를 반환합니다.',
  })
  id: number;
  @ApiProperty({
    description: '닉네임을 반환합니다',
  })
  username: string;
  @ApiProperty({ description: ' 이메일을 반환합니다.' })
  email: string;
}

export class FindUserResponseDto {
  @ApiProperty({
    example: true,
    description: '조회 성공 여부를 반환합니다',
    required: true,
  })
  success: boolean;
  @ApiProperty({
    description: 'success가 true이면 정보를 반환합니다',
    required: false,
    type: UserResponseInfo,
  })
  userInfo: UserResponseInfo | undefined;
}

/** 사용자 존재 유무 검색 api */
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

export class CheckUserExistsReponseDto {
  @ApiProperty({
    example: true,
    description: '성공 여부를 반환합니다',
    required: true,
  })
  success: boolean;
}

/** 사용자 회원가입 api */
export class RegisterUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: '회원을 가입할 이메일을 입력합니다',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '123456789',
    description: '비밀번호를 입력합니다',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 1,
    description: '관련 emailVerificationId를 입력합니다',
    required: true,
  })
  @IsNumber()
  @Type(() => Number)
  emailVerificationId: number;

  @ApiProperty({
    example: 'username',
    description: '아이디를 입력합니다.',
    required: true,
  })
  @IsString()
  username: string;
}

export class RegisterUserResponseDTO {
  @ApiProperty({
    example: true,
    description: '성공 여부를 반환합니다',
    required: true,
  })
  success: boolean;
}
