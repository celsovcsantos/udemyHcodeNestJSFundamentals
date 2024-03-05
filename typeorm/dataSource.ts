import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path:
    process.env.ENV === 'TEST'
      ? `${__dirname}/../../.env.test`
      : `${__dirname}/../../.env`,
});

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'), // Use a default port if DB_PORT is undefined
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [`${__dirname}/migrations/**/*.ts`],
});

export default dataSource;
