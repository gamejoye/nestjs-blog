import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { EnvConfigService } from 'src/modules/env-config/env-config.service';

@Injectable()
export class GithubAuthMiddleWare implements NestMiddleware {
  constructor(private envConfigService: EnvConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const query = req.query;
    const { error, error_description } = query;
    if (error !== undefined) {
      const GITHUB_FRONT_END_CALLBACK_URL =
        this.envConfigService.getGithubConfig().githubFrontEndCallbackUrl;
      res.redirect(
        `${GITHUB_FRONT_END_CALLBACK_URL}?msg=${
          error_description || 'unknowError'
        }&&state=failed`,
      );
    } else {
      next();
    }
  }
}
