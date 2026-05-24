/**전역 secrets 파일 */

const config = () => {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    test: {
      database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        database: process.env.DB_DATABASE || 'test',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
      },
    },

    dev: {
      database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        database: process.env.DB_DATABASE || 'test',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
      },
    },

    prod: {
      database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        database: process.env.DB_DATABASE || 'test',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
      },
    },
  };
};

export default config;
