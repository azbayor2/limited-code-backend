import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
// import { User } from './entity/User.entity';
// import { EmailVerification } from 'src/auth/entity/EmailVerification.entity';
import { UserService } from './user.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CheckUserExists,
  CheckUserExistsReponseDto,
  FindUserArgs,
  FindUserResponseDto,
  RegisterUserDto,
  RegisterUserResponseDTO,
  UserResponseInfo,
} from './user.dto';
import { User } from './entity/User.entity';

@ApiTags('users')
@Controller('/user')
export class UserController {
  constructor(
    // private readonly userRepository: typeof User,
    // private readonly emailVerificationRepository: typeof EmailVerification,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({
    description: '사용자가 존재하는지 확인합니다',
  })
  @ApiOkResponse({
    description: '성공했을 때 응답입니다.',
    type: CheckUserExistsReponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/exists')
  async exists(
    @Query() CheckUserExists: CheckUserExists,
  ): Promise<CheckUserExistsReponseDto> {
    return {
      success: await this.userService.check(CheckUserExists),
    };
  }

  @ApiOperation({
    description: '사용자를 id, 이메일, username으로 조회합니다',
  })
  @ApiOkResponse({
    description: '성공 시 반환입니다',
    type: FindUserResponseDto,
  })
  @Get('/')
  async get(@Query() findUserArgs: FindUserArgs): Promise<FindUserResponseDto> {
    const user: User | null = await this.userService.find(findUserArgs);
    const userInfo: UserResponseInfo | undefined = user
      ? {
          id: user.id,
          email: user.email,
          username: user.username,
        }
      : undefined;

    return {
      success: user ? true : false,
      userInfo: userInfo,
    };
  }

  @ApiOperation({
    description: '회원가입을 진행합니다',
  })
  @ApiCreatedResponse({
    description: '성공 응답을 반환합니다',
    type: RegisterUserResponseDTO,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<RegisterUserResponseDTO> {
    return { success: await this.userService.register(registerUserDto) };
  }
}
