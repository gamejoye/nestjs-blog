import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { getEnvironment } from '../utils/get-environment';
import { getCurrentDatetime } from '../utils/dayjs-helper';
import * as fs from 'fs';

const stream = fs.createWriteStream('requests.log', {
  flags: 'a',
});

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const env = getEnvironment();
    if (env === 'production') {
      const METHOD = req.method;
      const IP = req.headers['x-forwarded-for'];
      const PATH = req.url;
      const timestamp = getCurrentDatetime();
      const record = `${timestamp} - [${METHOD}] - { ${IP} } - ${PATH}\n`;
      stream.write(record);
    } else {
      console.log(req.method, req.url);
    }
    next();
  }
}
