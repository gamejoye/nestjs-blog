import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AccountsService } from 'src/modules/accounts/accounts.service';
import { Account } from '../accounts/entities/account.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private accountsService: AccountsService) {
    super();
  }

  async validate(username: string, password: string): Promise<Account> {
    const account = await this.accountsService.getByUsername(username);
    // console.log('account: ', account);
    const correct =
      account !== null &&
      (await bcrypt.compare(password, account.passwordHash));
    // console.log('correct: ', correct);
    if (!correct) {
      throw new HttpException(
        'username or password invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return account;
  }
}
