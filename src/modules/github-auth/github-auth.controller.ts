import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { GithubAuthService } from './github-auth.service';
import { GithubAuthGuard } from './github-auth.guard';
import { IAuthGithubCallbackDto } from './dto/auth-github-callback.dto';
import { GetUser } from './decorators/get-user.decorator';
import { Response } from 'express';
import { AccountsService } from '../accounts/accounts.service';
import { IAddAcountDto } from '../accounts/dto/add-account.dto';
import { GITHUB } from 'src/common/constants/platforms';
import { RedisCliService } from '../redis-cli/redis-cli.service';
import { EnvConfigService } from '../env-config/env-config.service';

@Controller('auth/github')
@UseGuards(GithubAuthGuard)
export class GithubAuthController {
  constructor(
    private githubAuthService: GithubAuthService,
    private accountsService: AccountsService,
    private redisCliService: RedisCliService,
    private envConfigService: EnvConfigService,
  ) {}

  @Get()
  auth() {
    return 'GithubAuth';
  }

  @Get('/callback')
  async authCallback(
    @GetUser() userDto: IAuthGithubCallbackDto,
    @Res() res: Response,
  ) {
    const { id, accessToken } = userDto;
    let account = await this.accountsService.getByPlatformUserIdAndPlatform(
      id,
      'github',
    );
    if (!account) {
      const dto: IAddAcountDto = {
        platformProfile: {
          platform: GITHUB,
          platformUserId: userDto.id,
          name: userDto.username,
          createTime: userDto.created_at,
          editTime: userDto.updated_at,
          avatarUrl: userDto.photos[0].value,
        },
      };
      account = await this.accountsService.add(dto);
    }
    const accountId = account.id;
    await this.redisCliService.setAccountIdByToken(accessToken, accountId);
    const GITHUB_FRONT_END_CALLBACK_URL =
      this.envConfigService.getGithubConfig().githubFrontEndCallbackUrl;
    res.redirect(
      `${GITHUB_FRONT_END_CALLBACK_URL}?uid=${userDto.accessToken}&&state=succeed`,
    );
  }
}
