import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';
import { TOKEN_EXPIRATION, TOKEN_PREFIX } from 'src/common/constants/redis';
import { EnvConfigService } from '../env-config/env-config.service';
import { IRedisCliService } from './interfaces/redis-cli.service.interface';

@Injectable()
export class RedisCliService implements OnModuleDestroy, IRedisCliService {
  private readonly cli: Redis;
  constructor(private envConfigService: EnvConfigService) {
    const config = envConfigService.getRedisConfig();
    this.cli = new Redis({
      host: config.host,
      port: config.port,
      db: config.db,
      retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
      },
    });
  }
  onModuleDestroy() {
    this.cli.quit();
  }
  async setAccountIdByToken(
    token: string,
    accountId: number,
    TTL = TOKEN_EXPIRATION,
  ) {
    const tokenKey = TOKEN_PREFIX + token;
    const status = await this.cli.set(tokenKey, accountId + '', 'EX', TTL);
    if (status !== 'OK') return false;
    return true;
  }

  async getAccountIdByToken(token: string): Promise<number | null> {
    const tokenKey = TOKEN_PREFIX + token;
    const idString = await this.cli.get(tokenKey);
    if (idString === null || idString === undefined) {
      return null;
    }
    const accountId = parseInt(idString);
    return accountId;
  }

  async isNullOrExpirationAfter(token: string, TTL = 60 * 60) {
    const tokenKey = TOKEN_PREFIX + token;
    const remainingTTL = await this.cli.ttl(tokenKey);
    if (remainingTTL === -1 || remainingTTL === -2) {
      // -1 没设置时间
      // -2 不存在key
      return true;
    }
    return remainingTTL <= TTL;
  }
}
