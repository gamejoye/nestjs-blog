import { Response } from 'express';

export function setXTotalCount(res: Response, totalCount: number) {
  res.setHeader('X-Total-Count', totalCount);
}
