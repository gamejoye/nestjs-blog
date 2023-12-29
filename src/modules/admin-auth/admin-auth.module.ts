import { Module } from '@nestjs/common';
import { AdminAuthController } from './admin-auth.controller';
import { InformationModule } from '../information/information.module';

@Module({
  imports: [InformationModule],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
