import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { getTokenFromRequest } from '../utils/auth';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { EnvConfigService } from 'src/modules/env-config/env-config.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private envConfigService: EnvConfigService) {}
  async canActivate(host: ExecutionContext): Promise<boolean> {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const token = getTokenFromRequest(request);
    if (token === null) return false;
    const config = this.envConfigService.getJwtConfig();
    const { name } = jwt.verify(token, config.secret) as {
      name: string | null;
    };
    if (!name) return false;
    return true;
  }
}
