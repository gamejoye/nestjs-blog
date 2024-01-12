import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountsService } from 'src/modules/accounts/accounts.service';
import { Account } from '../accounts/entities/account.entity';
import { EnvConfigService } from '../env-config/env-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private envConfigService: EnvConfigService,
    private accountsService: AccountsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfigService.getJwtConfig().secret,
    });
  }

  async validate(payload: any): Promise<Account | null> {
    // console.log('payload: ', payload);
    if (!payload || !payload.id) {
      return null;
    }
    const account = await this.accountsService.getById(payload.id);
    if (!account) {
      return null;
    }
    return account;
  }
}
