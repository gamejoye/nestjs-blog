import {
  ACCOUNT_REPOSITORY,
  DATA_SOURCE,
  PLATFORM_PROFILE_REPOSITORY,
} from 'src/common/constants/providers';
import { DataSource } from 'typeorm';
import { PlatformProfile } from '../platform-profiles/entities/platform-profile.entity';
import { Account } from './entities/account.entity';

export const accountsProviders = [
  {
    provide: PLATFORM_PROFILE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PlatformProfile),
    inject: [DATA_SOURCE],
  },
  {
    provide: ACCOUNT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Account),
    inject: [DATA_SOURCE],
  },
];
