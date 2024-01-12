import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './github-auth.strategy';
import { GithubAuthController } from './github-auth.controller';
import { AccountsModule } from '../accounts/accounts.module';
import { RedisCliModule } from '../redis-cli/redis-cli.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: ['github'] }),
    AccountsModule,
    RedisCliModule,
  ],
  controllers: [GithubAuthController],
  providers: [GithubStrategy],
})
export class GithubAuthModule {}
