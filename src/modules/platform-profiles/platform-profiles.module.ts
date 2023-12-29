import { Module } from '@nestjs/common';
import { PlatformProfilesService } from './platform-profiles.service';
import { platformProfilesProviders } from './platform-profiles.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...platformProfilesProviders, PlatformProfilesService],
})
export class PlatformProfilesModule {}
