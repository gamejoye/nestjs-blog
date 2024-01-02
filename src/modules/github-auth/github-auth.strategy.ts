import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { IAuthGithubCallbackDto } from './dto/auth-github-callback.dto';
import { EnvConfigService } from '../env-config/env-config.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private envConfigService: EnvConfigService) {
    const config = envConfigService.getGithubConfig();
    super({
      clientID: config.githubClientId,
      clientSecret: config.githubClientSecret,
      callbackURL: config.githubCallbackUrl,
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    partialDto: IAuthGithubCallbackDto,
    done: Function,
  ) {
    const dto: IAuthGithubCallbackDto = {
      ...partialDto,
      accessToken,
      refreshToken,
    };
    return done(null, dto);
  }
}
