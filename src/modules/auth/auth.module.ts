import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './github-auth.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: ['jwt', 'local', 'github'],
    }),
    AccountsModule,
  ],
  providers: [LocalStrategy, JwtStrategy, GithubStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
