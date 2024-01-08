export type IPlatform = 'qq' | 'wechat' | 'github';
export type IDatabaseConfig = {
  host: string;
  port: number;
  type: 'mysql';
  username: string;
  password: string;
  database: string;
};

export type IWebServerConfig = {
  port: number;
  origins: string[];
};

export type IRedisConfig = {
  host: string;
  port: number;
  db: number;
};

export type IGithubConfig = {
  githubClientId: string;
  githubClientSecret: string;
  githubCallbackUrl: string;
  githubFrontEndCallbackUrl: string;
};

export type IJwtConfig = {
  secret: string;
};
