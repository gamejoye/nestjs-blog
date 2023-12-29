import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RedisCliService } from 'src/modules/redis-cli/redis-cli.service';
import { getTokenFromRequest } from '../utils/auth';
import { Request, Response } from 'express';

@Injectable()
export class BearerTokenAuthGuard implements CanActivate {
  constructor(private redisCliService: RedisCliService) { }

  async canActivate(host: ExecutionContext): Promise<boolean> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const token = getTokenFromRequest(request);
    if (token === null) {
      return false;
    }
    const isInvalid = await this.redisCliService.isNullOrExpirationAfter(token);
    if (isInvalid) {
      return false;
    }
    return true;
  }
}
