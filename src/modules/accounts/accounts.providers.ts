import {
  ACCOUNT_REPOSITORY,
  DATA_SOURCE,
  ROLE_REPOSITORY,
} from 'src/common/constants/providers';
import { DataSource } from 'typeorm';
import { Account } from './entities/account.entity';
import { Role } from '../permission-manage/entitits/role.entity';

export const accountsProviders = [
  {
    provide: ROLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: [DATA_SOURCE],
  },
  {
    provide: ACCOUNT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Account),
    inject: [DATA_SOURCE],
  },
];
