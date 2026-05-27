import { Controller, Query, Get } from '@nestjs/common';
import { User } from './entity/user.entity';
import { EmailVerification } from 'src/auth/entity/EmailVerification.entity';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckUserExists, FindUserArgs } from './user.dto';

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
  @Get('/exists')
  async exists(@Query() CheckUserExists: CheckUserExists): Promise<object> {
    return {
      result: await this.userService.check(CheckUserExists),
    };
  }

  @ApiOperation({
    description: '사용자를 id, 이메일, username으로 조회합니다',
  })
  @Get('/')
  async get(@Query() findUserArgs: FindUserArgs) {
    return this.userService.find(findUserArgs);
  }
}
