require('dotenv').config();

const common = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'test',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
  seederStorage: 'sequelize',
  seederStorageTableName: 'SequelizeData', // 시드 설정
};

module.exports = {
  development: common,
  test: common,
  production: common,
};
