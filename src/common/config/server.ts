const env = process.env.NODE_ENV;

const PORT = process.env.PORT;

const originForFrontEnd =
  env === 'production' ? 'https://gamejoye.top' : 'http://localhost:3000';
const originForFrontEndAdmin =
  env === 'production' ? 'https://gamejoye.top:5173' : 'http://localhost:5173';
const CORS_ORIGINS = [originForFrontEnd, originForFrontEndAdmin];

export default {
  CORS_ORIGINS,
  PORT,
};
