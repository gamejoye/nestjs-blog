import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import githubPassportConfig from 'src/common/config/github-passport';
import { IAuthGithubCallbackDto } from './dto/auth-github-callback.dto';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: githubPassportConfig.GITHUB_CLIENT_ID,
      clientSecret: githubPassportConfig.GITHUB_CLIENT_SECRET,
      callbackURL: githubPassportConfig.GITHUB_CALLBACK_URL,
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
