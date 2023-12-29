const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://gamejoye.top:8080/auth/github/callback'
    : 'http://localhost:8080/auth/github/callback';
const GITHUB_FRONT_END_CALLBACK_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://gamejoye.top/auth/github/callback'
    : 'http://localhost:3000/auth/github/callback';

export default {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
  GITHUB_FRONT_END_CALLBACK_URL,
};
