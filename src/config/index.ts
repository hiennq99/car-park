import * as dotenv from 'dotenv';

dotenv.config();

export const ORM_CONFIG = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'user',
  password: process.env.PASSWORD || 'password',
  database: process.env.DATABASE || 'postgres',
};

export const DATA_FETCH = process.env.DATA_FETCH;
