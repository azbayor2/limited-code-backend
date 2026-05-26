import * as bcrypt from 'bcrypt';

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
}
