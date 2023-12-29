import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import config from 'src/common/config/github-passport';

@Injectable()
export class GithubAuthMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const query = req.query;
    const { error, error_description } = query;
    if (error !== undefined) {
      res.redirect(
        `${config.GITHUB_FRONT_END_CALLBACK_URL}?msg=${
          error_description || 'unknowError'
        }&&state=failed`,
      );
    } else {
      next();
    }
  }
}
