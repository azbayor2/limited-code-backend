/** 여기에 에러 코드 정의 */
export enum BusinessErrorCode {
  UNKNOWN_ERROR = 'unknown error',
}

/** 여기에 각 에러코드에 맞는 세부 정보 맵핑 (status, message) */
export const BusinessErrorRegistry: Record<
  BusinessErrorCode,
  { status: number; message: string }
> = {
  [BusinessErrorCode.UNKNOWN_ERROR]: {
    status: 999,
    message: 'real unkown error',
  },
};

/** 비즈니스 에러 클래스 */
export class BusinessException extends Error {
  public readonly errorCode: BusinessErrorCode;
  public readonly meta: Record<string, any> | undefined;

  constructor(
    errorCode: BusinessErrorCode,
    customMessage?: string,
    meta?: Record<string, any>,
  ) {
    super(customMessage || BusinessErrorRegistry[errorCode].message);

    this.name = 'BusinessError';
    this.errorCode = errorCode;
    this.meta = meta;
  }
}
