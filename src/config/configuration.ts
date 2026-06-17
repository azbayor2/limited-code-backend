/**전역 secrets 파일 */

const config = () => {
  return {
    /** 서버 포트 설정 */
    port: parseInt(process.env.PORT || '3000', 10),

    /** JWT 토큰 설정 */
    JWT: {
      ACCESS_SECRETS: process.env.JWT_ACCESS_SECRETS ?? '123456789',
      REFRESH_SECRETS: process.env.JWT_REFRESH_SECRETS ?? '987654321',
    },

    origins: [process.env.FRONTEND_URL],

    /** 이메일 설정 */
    mailer: {
      user: process.env.EMAIL_USER ?? '',
      pass: process.env.EMAIL_PASS ?? '',
      clientId: process.env.EMAIL_CLIENT_ID ?? '',
      clientSecret: process.env.EMAIL_CLIENT_SECRET ?? '',
      refreshToken: process.env.EMAIL_REFRESH_TOKEN ?? '',
    },

    /** 테스트 환경 설정 */
    test: {
      /** 데이터베이스 설정 */
      database: {
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT ?? '3306', 10),
        database: process.env.DB_DATABASE ?? 'test',
        username: process.env.DB_USER ?? 'root',
        password: process.env.DB_PASSWORD ?? 'password',
      },
    },

    dev: {
      database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        database: process.env.DB_DATABASE || 'test',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
      },
    },

    prod: {
      database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        database: process.env.DB_DATABASE || 'test',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
      },
    },
  };
};

export default config;
