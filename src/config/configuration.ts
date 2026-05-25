/**전역 secrets 파일 */

const config = () => {
  return {
    port: parseInt(process.env.PORT || '3000', 10),
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
