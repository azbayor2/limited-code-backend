import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { FindUserArgs, CheckUserExists } from './user.dto';
import { Op, WhereOptions } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async find({ id, email, username }: FindUserArgs): Promise<User | null> {
    if (!id && !email && !username) return null;

    const where: Partial<Pick<FindUserArgs, 'id' | 'email' | 'username'>> = {};

    if (id) where.id = id;
    if (email) where.email = email;
    if (username) where.username = username;

    return await this.userRepository.findOne({
      where,
      attributes: {
        exclude: ['password'],
      },
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

    return result >= 0 ? true : false;
  }
}
