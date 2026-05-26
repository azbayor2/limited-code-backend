/** 나중에 스키마 생성 시 수정 필요 */

export class User {
  id!: number;
  password!: string;
  username!: string;
  email!: string;
  createdAt!: Date;
  deletedAt!: Date;
}
