import * as dotenv from 'dotenv';
dotenv.config();

const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379');

const REDIS_HOST = process.env.REDIS_HOST;

const REDIS_DB = parseInt(process.env.REDIS_DB || '0');

export default {
  REDIS_PORT,
  REDIS_HOST,
  REDIS_DB,
};
