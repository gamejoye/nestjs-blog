import { Request } from 'express';

export function getTokenFromRequest(request: Request): string | null {
  const authorization: string = request.headers.authorization || '';
  if (!authorization.startsWith('Bearer ')) return null;
  const token = authorization.substring(7);
  return token;
}
