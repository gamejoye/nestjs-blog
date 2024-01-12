import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AccountsModule } from '../accounts/accounts.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: ['jwt', 'local'],
    }),
    AccountsModule,
  ],
  providers: [LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
