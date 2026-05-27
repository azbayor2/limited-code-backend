import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export class CryptoService {
  private readonly saltRounds = 10;

  /** 평문을 해시값으로 바꾸기 */
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  /** 평문과 해시값을 비교함 */
  async comparePassword(
    input: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(input, hashedPassword);
  }

  /** 인증번호 생성하기 */
  generateVerificationCode(): string {
    const code = crypto.randomInt(0, 1000000).toString().padStart(6, '0');

    return code;
  }
}
