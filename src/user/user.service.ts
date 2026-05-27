import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { FindUserArgs } from './user.type';

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
}
