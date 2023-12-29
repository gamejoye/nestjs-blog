import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { IAddAcountDto } from './dto/add-account.dto';
import { BearerTokenAuthGuard } from 'src/common/guards/bearer-token-auth.guard';
import { getTokenFromRequest } from 'src/common/utils/auth';
import { Request } from 'express';
import { RedisCliService } from '../redis-cli/redis-cli.service';

@Controller('accounts')
export class AccountsController {
  constructor(
    private accountsService: AccountsService,
    private redisCliService: RedisCliService,
  ) {}

  @Get(':id')
  @UseGuards(BearerTokenAuthGuard)
  async getAccountById(@Param('id', ParseIntPipe) accountId: number) {
    const account = await this.accountsService.getById(accountId);
    return account;
  }

  @Get()
  @UseGuards(BearerTokenAuthGuard)
  async getAccountByToken(@Req() request: Request) {
    const token = getTokenFromRequest(request);
    const id = await this.redisCliService.getAccountIdByToken(token);
    const account = await this.accountsService.getById(id);
    return account;
  }

  @Post()
  async addAccount(@Body() addAccountDto: IAddAcountDto) {
    const account = await this.accountsService.add(addAccountDto);
    return account;
  }
}
