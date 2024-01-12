import { Controller, Post, UseGuards } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { EnvConfigService } from '../env-config/env-config.service';
import * as jwt from 'jsonwebtoken';
import { TOKEN_EXPIRATION } from 'src/common/constants/redis';
import { LocalGuard } from './local.guard';
import { GetUser } from '../github-auth/decorators/get-user.decorator';
import { ILoginUserDto } from './dto/login-user.dto';

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
}
