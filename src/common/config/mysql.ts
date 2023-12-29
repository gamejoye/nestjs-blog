import * as dotenv from 'dotenv';
import { getEnvironment } from '../utils/get-environment';
dotenv.config();

const env = getEnvironment();
const MYSQL_PORT = parseInt(process.env.MYSQL_PORT || '3306');

const MYSQL_HOST = process.env.MYSQL_HOST;

const MYSQL_USER =
  env === 'development' || env === 'test'
    ? process.env.MYSQL_DEV_USER
    : process.env.MYSQL_PROD_USER;

const MYSQL_PASSWORD =
  env === 'development' || env === 'test'
    ? process.env.MYSQL_DEV_PASSWORD
    : process.env.MYSQL_PROD_PASSWORD;

const DATABASE = 'blog_system';

export default {
  MYSQL_PORT,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  DATABASE,
};
