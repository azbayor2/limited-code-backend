import { Request } from 'express';
import { User } from 'src/user/entity/User.entity';

export type Email = {
  email: string;
};

export type EmailVerification = {
  email: string;
  code: string;
};

export interface RequestWithUser extends Request {
  user: User;
}
