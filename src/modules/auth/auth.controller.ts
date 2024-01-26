import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { EnvConfigService } from '../env-config/env-config.service';
import * as jwt from 'jsonwebtoken';
import { TOKEN_EXPIRATION } from 'src/common/constants/redis';
import { LocalGuard } from './local.guard';
import { GetUser } from './decorators/get-user.decorator';
import { ILoginUserDto } from './dto/login-user.dto';
import { GithubAuthGuard } from './github-auth.guard';
import { IAuthGithubCallbackDto } from './dto/auth-github-callback.dto';
import { IAddAcountDto } from '../accounts/dto/add-account.dto';
import { GITHUB } from 'src/common/constants/platforms';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private accountsService: AccountsService,
    private envConfigService: EnvConfigService,
  ) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@GetUser() partialAccount: ILoginUserDto) {
    const { username, id } = partialAccount;
    const token = jwt.sign(
      { id, username },
      this.envConfigService.getJwtConfig().secret,
      { expiresIn: TOKEN_EXPIRATION },
    );
    const json = {
      id,
      username,
      token,
    };
    return json;
  }

  @Get('github')
  @UseGuards(GithubAuthGuard)
  auth() {
    return 'GithubAuth';
  }

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async authCallback(
    @GetUser() userDto: IAuthGithubCallbackDto,
    @Res() res: Response,
  ) {
    // console.log('done: ', userDto);
    const { id, accessToken, username } = userDto;
    let account = await this.accountsService.getByPlatformUserIdAndPlatform(
      id,
      'github',
    );
    // console.log('account: ', account);
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
    // console.log('account2: ', account);
    const accountId = account.id;
    const token = jwt.sign(
      { id: accountId, username },
      this.envConfigService.getJwtConfig().secret,
      { expiresIn: TOKEN_EXPIRATION },
    );
    const GITHUB_FRONT_END_CALLBACK_URL =
      this.envConfigService.getGithubConfig().githubFrontEndCallbackUrl;
    res.redirect(
      `${GITHUB_FRONT_END_CALLBACK_URL}?uid=${token}&&state=succeed`,
    );
  }
}
