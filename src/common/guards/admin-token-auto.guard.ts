import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { getTokenFromRequest } from '../utils/auth';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  async canActivate(host: ExecutionContext): Promise<boolean> {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const token = getTokenFromRequest(request);
    if (token === null) return false;
    const { name } = jwt.verify(token, process.env.SECRET) as {
      name: string | null;
    };
    if (!name) return false;
    return true;
  }
}
