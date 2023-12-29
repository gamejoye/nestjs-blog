import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { accountsProviders } from './accounts.providers';
import { AccountsController } from './accounts.controller';
import { DatabaseModule } from '../database/database.module';
import { RedisCliModule } from '../redis-cli/redis-cli.module';

@Module({
  imports: [DatabaseModule, RedisCliModule],
  controllers: [AccountsController],
  providers: [...accountsProviders, AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
