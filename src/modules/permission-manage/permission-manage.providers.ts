import {
  DATA_SOURCE,
  PERMISSION_REPOSITORY,
  ROLE_REPOSITORY,
} from 'src/common/constants/providers';
import { DataSource } from 'typeorm';
import { Role } from './entitits/role.entity';
import { Permission } from './entitits/permission.entity';

export const permissionManageProviders = [
  {
    provide: ROLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: [DATA_SOURCE],
  },
  {
    provide: PERMISSION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Permission),
    inject: [DATA_SOURCE],
  },
];
