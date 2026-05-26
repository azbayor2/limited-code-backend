/**전역 secrets 파일 */

const config = () => {
  return {
    port: parseInt(process.env.PORT || '3000', 10),

    JWT: {
      ACCESS_SECRETS: process.env.JWT_ACCESS_SECRETS ?? '123456789',
      REFRESH_SECRETS: process.env.JWT_REFRESH_SECRETS ?? '987654321',
    },

    test: {
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
