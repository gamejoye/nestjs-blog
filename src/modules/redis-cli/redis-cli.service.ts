import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';
import { TOKEN_EXPIRATION, TOKEN_PREFIX } from 'src/common/constants/redis';
import config from 'src/common/config/redis-cli';

@Injectable()
export class RedisCliService implements OnModuleDestroy {
  private readonly cli: Redis;
  constructor() {
    this.cli = new Redis({
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
      db: config.REDIS_DB,
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
    await this.cli.set(tokenKey, accountId + '', 'EX', TTL);
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
