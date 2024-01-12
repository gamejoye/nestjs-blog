import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { GithubAuthGuard } from './github-auth.guard';
import { IAuthGithubCallbackDto } from './dto/auth-github-callback.dto';
import { GetUser } from './decorators/get-user.decorator';
import { Response } from 'express';
import { AccountsService } from '../accounts/accounts.service';
import { IAddAcountDto } from '../accounts/dto/add-account.dto';
import { GITHUB } from 'src/common/constants/platforms';
import { RedisCliService } from '../redis-cli/redis-cli.service';
import { EnvConfigService } from '../env-config/env-config.service';
import * as jwt from 'jsonwebtoken';
import { TOKEN_EXPIRATION } from 'src/common/constants/redis';

@Controller('auth/github')
export class GithubAuthController {
  constructor(
    private accountsService: AccountsService,
    private redisCliService: RedisCliService,
    private envConfigService: EnvConfigService,
  ) {}

  @Get()
  @UseGuards(GithubAuthGuard)
  auth() {
    return 'GithubAuth';
  }

  @Get('/callback')
  @UseGuards(GithubAuthGuard)
  async authCallback(
    @GetUser() userDto: IAuthGithubCallbackDto,
    @Res() res: Response,
  ) {
    const { id, accessToken, username } = userDto;
    console.log('done: ', userDto);
    let account = await this.accountsService.getByPlatformUserIdAndPlatform(
      id,
      'github',
    );
    console.log('account: ', account);
    if (!account) {
      const dto: IAddAcountDto = {
        platformProfile: {
          platform: GITHUB,
          platformUserId: userDto.id,
          username: userDto.username,
          avatarUrl: userDto.photos[0].value,
          accessToken,
        },
      };
      account = await this.accountsService.add(dto);
    }
    console.log('account2: ', account);
    const accountId = account.id;
    const token = jwt.sign(
      { id: accountId, username },
      this.envConfigService.getJwtConfig().secret,
      { expiresIn: TOKEN_EXPIRATION },
    );
    // await this.redisCliService.setAccountIdByToken(accessToken, accountId);
    const GITHUB_FRONT_END_CALLBACK_URL =
      this.envConfigService.getGithubConfig().githubFrontEndCallbackUrl;
    res.redirect(
      `${GITHUB_FRONT_END_CALLBACK_URL}?uid=${token}&&state=succeed`,
    );
  }
}
