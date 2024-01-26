import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { RedisCliService } from '../redis-cli/redis-cli.service';
import { JwtGuard } from '../auth/jwt.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Account } from './entities/account.entity';

@Controller('accounts')
export class AccountsController {
  constructor(
    private accountsService: AccountsService,
    private redisCliService: RedisCliService,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  async getAccountByToken(@GetUser() account: Account) {
    if (!account) {
      throw new HttpException('身份认证无效', HttpStatus.UNAUTHORIZED);
    }
    return account;
  }
}
