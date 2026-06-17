import { Injectable } from '@nestjs/common';
import { User } from './entity/User.entity';
import { InjectModel } from '@nestjs/sequelize';
import { FindUserArgs, CheckUserExists, RegisterUserDto } from './user.dto';
import { Op, WhereOptions } from 'sequelize';
import { EmailVerification } from 'src/auth/entity/EmailVerification.entity';
import {
  BusinessErrorCode,
  BusinessException,
} from 'src/exception/BusinessException.type';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(EmailVerification)
    private readonly emailVerificationRepository: typeof EmailVerification,
    private readonly cryptoService: CryptoService,
  ) {}

  async find(
    { id, email, username }: FindUserArgs,
    options: {
      excludePassword: boolean;
    } = { excludePassword: true },
  ): Promise<User | null> {
    if (!id && !email && !username) return null;

    const where: Partial<Pick<FindUserArgs, 'id' | 'email' | 'username'>> = {};

    if (id) where.id = id;
    if (email) where.email = email;
    if (username) where.username = username;

    const attributes: { exclude: string[] } = { exclude: [] };
    if (options.excludePassword) attributes.exclude.push('password');

    return await this.userRepository.findOne({
      where,
      attributes,
    });
  }

  async check({ username, email }: CheckUserExists): Promise<boolean> {
    if (!username && !email) return false;
    const where: WhereOptions = [];

    if (username) where.push({ username });
    if (email) where.push({ email });

    const result = await this.userRepository.count({
      where: {
        [Op.or]: [...where],
      },
    });

    return result > 0 ? true : false;
  }

  async register(user: RegisterUserDto) {
    const verificationId = user.emailVerificationId;

    /** 인증되었는지 검삭하기 */

    const emailVerification = await this.emailVerificationRepository.findOne({
      where: {
        id: verificationId,
      },
    });

    /** 이메일 인증 관련 정보가 없으면*/
    if (!emailVerification)
      throw new BusinessException(
        BusinessErrorCode.EMAIL_VERIFICATION_DATA_NOT_FOUND,
      );

    /** 이메일 인증을 안했다면 */
    if (!emailVerification.verified) {
      throw new BusinessException(BusinessErrorCode.EMAIL_NOT_VERIFIED);
    }

    /** 사용자가 이미 존재하면 */
    if (await this.find({ email: user.email }))
      throw new BusinessException(BusinessErrorCode.USER_ALREADY_EXISTS);

    /** 비밀번호 해싱하기. */
    const hashed = await this.cryptoService.hashPassword(user.password);

    /** 사용자 생성하기 */
    await this.userRepository.create({
      username: user.username,
      email: user.email,
      password: hashed,
    });

    return true;
  }
}
