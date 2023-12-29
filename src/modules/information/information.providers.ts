import {
  DATA_SOURCE,
  INFORMATION_REPOSITORY,
} from 'src/common/constants/providers';
import { Information } from './entities/information.entity';
import { DataSource } from 'typeorm';

export const informationProviders = [
  {
    provide: INFORMATION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Information),
    inject: [DATA_SOURCE],
  },
];
