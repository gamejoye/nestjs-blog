import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvConfigService } from './interfaces/env-config.service.interface';
import {
  IDatabaseConfig,
  IGithubConfig,
  IJwtConfig,
  IRedisConfig,
  IWebServerConfig,
} from 'src/common/types/base.type';

@Injectable()
export class EnvConfigService implements IEnvConfigService {
  constructor(private configService: ConfigService) {}

  getDatabaseConfig(): IDatabaseConfig {
    return {
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      type: this.configService.get<'mysql'>('DATABASE_TYPE'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_DATABASE'),
    };
  }

  getWebServerConfig(): IWebServerConfig {
    return {
      port: this.configService.get<number>('SERVER_PORT'),
      origins: this.configService
        .get<string>('SERVER_ORIGINS')
        .split(',')
        .map((origin) => origin.trim()),
    };
  }

  getGithubConfig(): IGithubConfig {
    return {
      githubClientId: this.configService.get<string>('GITHUB_CLIENT_ID'),
      githubClientSecret: this.configService.get<string>(
        'GITHUB_CLIENT_SECRET',
      ),
      githubCallbackUrl: this.configService.get<string>('GITHUB_CALLBACK_URL'),
      githubFrontEndCallbackUrl: this.configService.get<string>(
        'GITHUB_FRONT_END_CALLBACK_URL',
      ),
    };
  }

  getRedisConfig(): IRedisConfig {
    return {
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
      db: this.configService.get<number>('REDIS_DB'),
    };
  }

  getJwtConfig(): IJwtConfig {
    return {
      secret: this.configService.get<string>('JWT_SECRET'),
    };
  }
}
