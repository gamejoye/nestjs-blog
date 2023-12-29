import {
  DATA_SOURCE,
  PLATFORM_PROFILE_REPOSITORY,
} from 'src/common/constants/providers';
import { DataSource } from 'typeorm';
import { PlatformProfile } from './entities/platform-profile.entity';

export const platformProfilesProviders = [
  {
    provide: PLATFORM_PROFILE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PlatformProfile),
    inject: [DATA_SOURCE],
  },
];
