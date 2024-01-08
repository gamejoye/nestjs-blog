export interface IRedisCliService {
  setAccountIdByToken(
    token: string,
    accountId: number,
    TTL: number,
  ): Promise<boolean>;
  getAccountIdByToken(token: string): Promise<number | null>;
  isNullOrExpirationAfter(token: string, TTL: number): Promise<boolean>;
}
