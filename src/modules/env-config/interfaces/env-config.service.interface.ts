import {
  IDatabaseConfig,
  IGithubConfig,
  IJwtConfig,
  IRedisConfig,
  IWebServerConfig,
} from 'src/common/types/base.type';

export interface IEnvConfigService {
  getDatabaseConfig(): IDatabaseConfig;
  getWebServerConfig(): IWebServerConfig;
  getGithubConfig(): IGithubConfig;
  getRedisConfig(): IRedisConfig;
  getJwtConfig(): IJwtConfig;
}
